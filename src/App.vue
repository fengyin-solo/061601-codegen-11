<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useGameStore } from './stores/gameStore'
import { useSaveStore } from './stores/saveStore'
import gameConfig from './config/gameConfig'
import type { WeekendItineraryConfig } from './types/game'
import TopBar from './components/TopBar.vue'
import CharacterPanel from './components/CharacterPanel.vue'
import ActionPanel from './components/ActionPanel.vue'
import LogPanel from './components/LogPanel.vue'
import EventModal from './components/EventModal.vue'
import SaveModal from './components/SaveModal.vue'
import CardCollection from './components/CardCollection.vue'
import HistoryPanel from './components/HistoryPanel.vue'
import GiftModal from './components/GiftModal.vue'
import WeekendItineraryModal from './components/WeekendItineraryModal.vue'

const gameStore = useGameStore()
const saveStore = useSaveStore()

const showSaveModal = ref(false)
const showCards = ref(false)
const showHistory = ref(false)
const showGiftModal = ref(false)
const showWeekendSelect = ref(false)

function getCharacterName(characterId: string): string {
  const char = gameConfig.characters.find(c => c.id === characterId)
  return char ? `${char.avatar} ${char.name}` : characterId
}

function selectItinerary(itinerary: WeekendItineraryConfig) {
  if (gameStore.actionsRemaining < itinerary.energyCost) {
    gameStore.addLog('system', '⚠️ 行动力不足，无法前往周末行程')
    return
  }
  const success = gameStore.startWeekendItinerary(itinerary)
  if (success) {
    showWeekendSelect.value = false
  }
}

const theme = computed(() => gameStore.darkMode ? 'dark' : 'light')

watch(() => gameStore.day, () => {
  saveStore.autoSave()
})

watch(theme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme)
})

onMounted(() => {
  document.documentElement.setAttribute('data-theme', theme.value)
  
  const hasSave = saveStore.hasAutoSave()
  if (hasSave) {
    if (confirm('检测到自动存档，是否继续游戏？')) {
      saveStore.loadAutoSave()
    } else {
      gameStore.resetGame()
    }
  } else {
    gameStore.resetGame()
  }
})
</script>

<template>
  <div class="game-container">
    <TopBar 
      @toggle-save="showSaveModal = true"
      @toggle-cards="showCards = true"
      @toggle-history="showHistory = true"
      @toggle-theme="gameStore.toggleDarkMode()"
      @reset="gameStore.resetGame()"
    />
    
    <div class="main-content">
      <div class="left-column">
        <CharacterPanel />
        <ActionPanel @open-gift="showGiftModal = true" @open-weekend="showWeekendSelect = true" />
      </div>
      
      <div class="right-column">
        <LogPanel />
      </div>
    </div>

    <EventModal />
    <WeekendItineraryModal />
    <SaveModal v-if="showSaveModal" @close="showSaveModal = false" />
    <CardCollection v-if="showCards" @close="showCards = false" />
    <HistoryPanel v-if="showHistory" @close="showHistory = false" />
    <GiftModal v-if="showGiftModal" @close="showGiftModal = false" />

    <Teleport to="body">
      <div v-if="showWeekendSelect" class="modal-overlay" @click.self="showWeekendSelect = false">
        <div class="modal-content weekend-select-modal">
          <div class="modal-header">
            <h2>✈️ 周末特别行程</h2>
            <button class="close-btn" @click="showWeekendSelect = false">✕</button>
          </div>
          <p class="select-desc">周末专属！花费更多代币和行动力，换取稀有剧情和收藏卡牌。每个行程只能体验一次。</p>
          <div class="itinerary-list">
            <div
              v-for="it in gameStore.availableWeekendItineraries"
              :key="it.id"
              class="itinerary-card"
              :class="{ disabled: gameStore.actionsRemaining < it.energyCost }"
              @click="selectItinerary(it)"
            >
              <div class="it-header">
                <span class="it-icon">{{ it.icon }}</span>
                <div class="it-info">
                  <span class="it-name">{{ it.name }}</span>
                  <span class="it-char">{{ getCharacterName(it.characterId) }}</span>
                </div>
              </div>
              <p class="it-desc">{{ it.description }}</p>
              <div class="it-cost">
                <span class="it-cost-item">💰 {{ it.cost }}</span>
                <span class="it-cost-item">⚡ {{ it.energyCost }}</span>
                <span v-if="it.minAffinity" class="it-cost-item">❤️ 好感≥{{ it.minAffinity }}</span>
              </div>
            </div>
            <div v-if="gameStore.availableWeekendItineraries.length === 0" class="no-itineraries">
              暂无可用行程，请提升好感度或积攒代币
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.game-container {
  min-height: 100vh;
  padding: 16px;
  max-width: 1400px;
  margin: 0 auto;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 16px;
  margin-top: 16px;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.right-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.weekend-select-modal {
  padding: 28px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.modal-header h2 {
  font-size: 20px;
  font-weight: 700;
}

.close-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--bg-tertiary);
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: var(--accent-light);
}

.select-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
  padding: 10px 14px;
  background: #fef3c7;
  border-radius: var(--radius-sm);
  color: #92400e;
}

[data-theme='dark'] .select-desc {
  background: #78350f;
  color: #fde68a;
}

.itinerary-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.itinerary-card {
  padding: 16px;
  background: var(--bg-tertiary);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;
}

.itinerary-card:hover {
  border-color: #f59e0b;
  background: #fffbeb;
  transform: translateX(4px);
}

.itinerary-card.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.itinerary-card.disabled:hover {
  border-color: transparent;
  background: var(--bg-tertiary);
  transform: none;
}

[data-theme='dark'] .itinerary-card:hover {
  background: #451a03;
}

.it-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.it-icon {
  font-size: 32px;
}

.it-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.it-name {
  font-weight: 700;
  font-size: 16px;
}

.it-char {
  font-size: 13px;
  color: var(--text-secondary);
}

.it-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 8px;
}

.it-cost {
  display: flex;
  gap: 10px;
}

.it-cost-item {
  font-size: 12px;
  padding: 2px 8px;
  background: var(--bg-secondary);
  border-radius: 9999px;
  color: var(--text-secondary);
}

.no-itineraries {
  text-align: center;
  padding: 24px;
  color: var(--text-muted);
  font-size: 14px;
}

@media (max-width: 900px) {
  .main-content {
    grid-template-columns: 1fr;
  }
}
</style>
