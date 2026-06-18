<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../stores/gameStore'
import gameConfig from '../config/gameConfig'
import { getRarityColor, getRarityLabel } from '../utils/gameUtils'
import type { WeekendItineraryChoice } from '../types/game'

const gameStore = useGameStore()

const itinerary = computed(() => gameStore.currentWeekendItinerary)

const characterConfig = computed(() => {
  if (!itinerary.value) return null
  return gameConfig.characters.find(c => c.id === itinerary.value!.characterId)
})

const rewardCard = computed(() => {
  if (!itinerary.value?.rewardCardId) return null
  return gameConfig.cards.find(c => c.id === itinerary.value!.rewardCardId)
})

function handleChoice(choice: WeekendItineraryChoice) {
  gameStore.handleWeekendChoice(choice)
}

function formatEffect(effect: any): string {
  let result = ''
  if (effect.affinityChange !== undefined) {
    const char = gameConfig.characters.find(c => c.id === effect.characterId)
    const name = char?.name || effect.characterId
    const sign = effect.affinityChange > 0 ? '+' : ''
    result += `${name} 好感 ${sign}${effect.affinityChange}`
  }
  if (effect.moodChange !== undefined) {
    if (result) result += '，'
    const sign = effect.moodChange > 0 ? '+' : ''
    result += `心情 ${sign}${effect.moodChange}`
  }
  return result
}
</script>

<template>
  <Teleport to="body">
    <div v-if="gameStore.showWeekendItineraryModal && itinerary" class="modal-overlay" @click.self="">
      <div class="modal-content weekend-modal">
        <div class="weekend-header">
          <div class="weekend-badge">
            <span class="badge-icon">✈️</span>
            <span class="badge-text">周末特别行程</span>
          </div>
          <div v-if="characterConfig" class="weekend-character">
            <span class="char-avatar">{{ characterConfig.avatar }}</span>
            <span class="char-name">{{ characterConfig.name }}</span>
          </div>
        </div>

        <div class="itinerary-title-row">
          <span class="itinerary-icon">{{ itinerary.icon }}</span>
          <h2 class="itinerary-name">{{ itinerary.name }}</h2>
        </div>

        <p class="itinerary-desc">{{ itinerary.description }}</p>

        <div class="story-box">
          <p class="story-text">{{ itinerary.storyText }}</p>
        </div>

        <div v-if="rewardCard" class="reward-preview">
          <span class="reward-label">🎁 可能获得</span>
          <span class="reward-card" :style="{ borderColor: getRarityColor(rewardCard.rarity) }">
            <span class="reward-card-icon">{{ rewardCard.image }}</span>
            <span class="reward-card-name">{{ rewardCard.name }}</span>
            <span class="badge" :class="`badge-${rewardCard.rarity}`">
              {{ getRarityLabel(rewardCard.rarity) }}
            </span>
          </span>
        </div>

        <div class="cost-info">
          <span class="cost-item">💰 花费 {{ itinerary.cost }} 代币</span>
          <span class="cost-item">⚡ 消耗 {{ itinerary.energyCost }} 行动力</span>
        </div>

        <div class="weekend-choices">
          <button
            v-for="choice in itinerary.choices"
            :key="choice.id"
            class="choice-btn weekend-choice"
            @click="handleChoice(choice)"
          >
            <span class="choice-text">{{ choice.text }}</span>
            <div class="choice-effects">
              <span
                v-for="(effect, idx) in choice.effects"
                :key="idx"
                class="effect-tag"
                :class="{ positive: effect.affinityChange > 0 || effect.moodChange > 0, negative: effect.affinityChange < 0 || effect.moodChange < 0 }"
              >
                {{ formatEffect(effect) }}
              </span>
              <span v-if="choice.resourceChange" class="effect-tag" :class="{ positive: choice.resourceChange > 0, negative: choice.resourceChange < 0 }">
                代币 {{ choice.resourceChange > 0 ? '+' : '' }}{{ choice.resourceChange }}
              </span>
              <span v-if="choice.addCardId" class="effect-tag card-reward">
                🎴 获得卡牌
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.weekend-modal {
  padding: 32px;
  max-width: 560px;
  border: 2px solid #f59e0b;
}

.weekend-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.weekend-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border-radius: 9999px;
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.badge-icon {
  font-size: 16px;
}

.weekend-character {
  display: flex;
  align-items: center;
  gap: 8px;
}

.char-avatar {
  width: 36px;
  height: 36px;
  background: var(--bg-tertiary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.char-name {
  font-weight: 600;
  font-size: 14px;
}

.itinerary-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.itinerary-icon {
  font-size: 36px;
}

.itinerary-name {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
}

.itinerary-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
  padding: 12px 16px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
  border-left: 4px solid #f59e0b;
}

.story-box {
  margin-bottom: 16px;
  padding: 16px;
  background: linear-gradient(135deg, #fef3c7, #fffbeb);
  border-radius: var(--radius-md);
  border: 1px solid #fde68a;
}

[data-theme='dark'] .story-box {
  background: linear-gradient(135deg, #78350f, #451a03);
  border-color: #92400e;
}

.story-text {
  font-size: 14px;
  line-height: 1.9;
  color: #92400e;
}

[data-theme='dark'] .story-text {
  color: #fde68a;
}

.reward-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding: 12px 16px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
}

.reward-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  white-space: nowrap;
}

.reward-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: var(--accent-light);
  border-radius: var(--radius-sm);
  border: 2px solid;
}

.reward-card-icon {
  font-size: 20px;
}

.reward-card-name {
  font-size: 13px;
  font-weight: 600;
}

.cost-info {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  padding: 10px 14px;
  background: #fef3c7;
  border-radius: var(--radius-sm);
}

[data-theme='dark'] .cost-info {
  background: #78350f;
}

.cost-item {
  font-size: 13px;
  color: #92400e;
  font-weight: 500;
}

[data-theme='dark'] .cost-item {
  color: #fde68a;
}

.weekend-choices {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.weekend-choice {
  width: 100%;
  padding: 14px 18px;
  text-align: left;
  background: var(--bg-tertiary);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  transition: all 0.2s;
}

.weekend-choice:hover {
  border-color: #f59e0b;
  background: #fffbeb;
  transform: translateX(4px);
}

[data-theme='dark'] .weekend-choice:hover {
  background: #451a03;
}

.choice-text {
  display: block;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--text-primary);
}

.choice-effects {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.effect-tag {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--bg-secondary);
  color: var(--text-secondary);
}

.effect-tag.positive {
  background: #dcfce7;
  color: #166534;
}

[data-theme='dark'] .effect-tag.positive {
  background: #14532d;
  color: #86efac;
}

.effect-tag.negative {
  background: #fee2e2;
  color: #991b1b;
}

[data-theme='dark'] .effect-tag.negative {
  background: #7f1d1d;
  color: #fca5a5;
}

.effect-tag.card-reward {
  background: #f3e8ff;
  color: #7c3aed;
}

[data-theme='dark'] .effect-tag.card-reward {
  background: #4c1d95;
  color: #c4b5fd;
}
</style>
