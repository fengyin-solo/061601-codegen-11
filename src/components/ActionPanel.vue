<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../stores/gameStore'
import gameConfig from '../config/gameConfig'

const emit = defineEmits<{
  (e: 'open-gift'): void
  (e: 'open-weekend'): void
}>()

const gameStore = useGameStore()

const canPerformAction = computed(() => gameStore.actionsRemaining > 0)

const hasSelectedCharacter = computed(() => gameStore.selectedCharacterId !== null)

const isWeekend = computed(() => gameStore.isWeekend)

const hasAvailableItineraries = computed(() => gameStore.availableWeekendItineraries.length > 0)

const canWeekendTrip = computed(() =>
  isWeekend.value && canPerformAction.value && hasAvailableItineraries.value
)

function doChat() {
  if (!hasSelectedCharacter.value || !canPerformAction.value) return
  gameStore.performAction('chat', gameStore.selectedCharacterId!)
}

function doWork() {
  if (!canPerformAction.value) return
  gameStore.performAction('work')
}

function doWeekendTrip() {
  if (!canWeekendTrip.value) return
  emit('open-weekend')
}
</script>

<template>
  <div class="action-panel card">
    <h2 class="panel-title">
      <span class="title-icon">🎯</span>
      行动
    </h2>

    <div class="action-grid">
      <button 
        class="action-btn chat"
        :disabled="!hasSelectedCharacter || !canPerformAction"
        @click="doChat"
      >
        <span class="action-icon">💬</span>
        <span class="action-name">聊天</span>
        <span class="action-desc">和角色聊天增进感情</span>
        <span class="action-cost">消耗 1 行动力</span>
      </button>

      <button 
        class="action-btn gift"
        :disabled="!hasSelectedCharacter || !canPerformAction"
        @click="emit('open-gift')"
      >
        <span class="action-icon">🎁</span>
        <span class="action-name">送礼</span>
        <span class="action-desc">送礼物给喜欢的人</span>
        <span class="action-cost">消耗 1 行动力</span>
      </button>

      <button
        class="action-btn work"
        :disabled="!canPerformAction"
        @click="doWork"
      >
        <span class="action-icon">💼</span>
        <span class="action-name">打工</span>
        <span class="action-desc">努力工作赚取代币</span>
        <span class="action-cost">消耗 2 行动力</span>
      </button>

      <button
        v-if="isWeekend"
        class="action-btn weekend"
        :disabled="!canWeekendTrip"
        @click="doWeekendTrip"
      >
        <span class="action-icon">✈️</span>
        <span class="action-name">周末行程</span>
        <span class="action-desc">高成本换取稀有剧情与收藏</span>
        <span class="action-cost weekend-cost">消耗 3 行动力 + 代币</span>
      </button>
    </div>

    <div v-if="!hasSelectedCharacter && !isWeekend" class="hint">
      💡 请先选择一个角色进行互动
    </div>

    <div v-if="isWeekend && !hasAvailableItineraries" class="hint weekend-hint">
      ✈️ 周末特别行程已开启！但没有可用的行程，请提升好感或积攒代币
    </div>

    <div v-if="isWeekend && hasAvailableItineraries && !canPerformAction" class="hint weekend-hint">
      ⚡ 周末行程已就绪，但行动力不足
    </div>

    <div v-if="!isWeekend && !canPerformAction" class="hint warning">
      ⚡ 今天的行动力已用完，等待明天吧~
    </div>

    <div v-if="isWeekend && canPerformAction && hasAvailableItineraries" class="hint weekend-available">
      🎉 周末特别行程开放中！点击「周末行程」开启稀有剧情
    </div>
  </div>
</template>

<style scoped>
.action-panel {
  padding: 20px;
}

.panel-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-icon {
  font-size: 22px;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 20px 12px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
  transition: all 0.2s;
}

.action-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px var(--shadow-color);
}

.action-btn.chat:hover:not(:disabled) {
  background: #dbeafe;
}

.action-btn.gift:hover:not(:disabled) {
  background: #fce7f3;
}

.action-btn.work:hover:not(:disabled) {
  background: #dcfce7;
}

.action-btn.weekend:hover:not(:disabled) {
  background: #fef3c7;
  border: 2px solid #f59e0b;
  transform: translateY(-3px) scale(1.02);
}

.weekend-cost {
  background: #fef3c7 !important;
  color: #92400e !important;
}

.action-icon {
  font-size: 32px;
}

.action-name {
  font-weight: 600;
  font-size: 15px;
}

.action-desc {
  font-size: 12px;
  color: var(--text-secondary);
  text-align: center;
}

.action-cost {
  font-size: 11px;
  color: var(--text-muted);
  background: var(--bg-secondary);
  padding: 2px 8px;
  border-radius: 9999px;
}

.hint {
  margin-top: 12px;
  padding: 10px 14px;
  background: #fef3c7;
  color: #92400e;
  border-radius: var(--radius-sm);
  font-size: 13px;
}

.hint.warning {
  background: #fee2e2;
  color: #991b1b;
}

.hint.weekend-hint {
  background: #fef3c7;
  color: #92400e;
}

.hint.weekend-available {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  color: #92400e;
  font-weight: 600;
  animation: weekendPulse 2s ease-in-out infinite;
}

@keyframes weekendPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

@media (max-width: 600px) {
  .action-grid {
    grid-template-columns: 1fr;
  }
}
</style>
