import { In, Repository } from 'typeorm'
import { isAPI } from '../globals.js'
import { MINUTES, SECONDS } from '../utils.js'
import { BaseGuildRepository } from './BaseGuildRepository.js'
import { cleanupNicknames } from './cleanup/nicknames.js'
import { dataSource } from './dataSource.js'
import { NicknameHistoryEntry } from './entities/NicknameHistoryEntry.js'

const CLEANUP_INTERVAL = 5 * MINUTES

async function cleanup() {
  await cleanupNicknames()
  setTimeout(cleanup, CLEANUP_INTERVAL)
}

if (!isAPI()) {
  // Start first cleanup 30 seconds after startup
  // TODO: Move to bot startup code
  setTimeout(cleanup, 30 * SECONDS)
}

export const MAX_NICKNAME_ENTRIES_PER_USER = 10

export class GuildNicknameHistory extends BaseGuildRepository {
  private nicknameHistory: Repository<NicknameHistoryEntry>

  constructor(guildId) {
    super(guildId)
    this.nicknameHistory = dataSource.getRepository(NicknameHistoryEntry)
  }

  async getByUserId(userId): Promise<NicknameHistoryEntry[]> {
    return this.nicknameHistory.find({
      where: {
        guild_id: this.guildId,
        user_id: userId,
      },
      order: {
        id: 'DESC',
      },
    })
  }

  getLastEntry(userId): Promise<NicknameHistoryEntry | null> {
    return this.nicknameHistory.findOne({
      where: {
        guild_id: this.guildId,
        user_id: userId,
      },
      order: {
        id: 'DESC',
      },
    })
  }

  async addEntry(userId, nickname) {
    await this.nicknameHistory.insert({
      guild_id: this.guildId,
      user_id: userId,
      nickname,
    })

    // Cleanup (leave only the last MAX_USERNAME_ENTRIES_PER_USER entries)
    const toDelete = await this.nicknameHistory
      .createQueryBuilder()
      .where('guild_id = :guildId', { guildId: this.guildId })
      .andWhere('user_id = :userId', { userId })
      .orderBy('id', 'DESC')
      .skip(MAX_NICKNAME_ENTRIES_PER_USER)
      .take(99_999)
      .getMany()

    if (toDelete.length > 0) {
      await this.nicknameHistory.delete({
        id: In(toDelete.map((v) => v.id)),
      })
    }
  }
}
