<script setup lang="ts">
import { ref } from 'vue'
import EAButton from '@/components/common/EAButton/EAButton.vue'
import EAModal from '@/components/layout/EAModal/EAModal.vue'
import { useLessonsStore } from '@/stores/lessonsStore'
import IconCoin from '@/components/icons/IconCoin.vue'
import type { Lesson, Word } from '@/types/lessonTypes'
import IconLoading from '@/components/icons/IconLoading.vue'
import { useUserStore } from '@/stores/userStore'

const props = defineProps<{
  lesson: Lesson
}>()

function shuffleArray(array: Word[]) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

const answers = ref([])
const cardValues = ref<Word[]>([])
const randomText = ref<Word>({ word: '', translate: '' })
const photoUrl = ref('')
const isLoading = ref(true)
let words = JSON.parse(JSON.stringify(props.lesson.words))
let walidWords = words
let random = Math.round(Math.random() * (walidWords.length - 1))
let randomPlace = Math.round(Math.random() * 3)
let randomValue = walidWords[random]
words = words.filter((w: Word) => w.word !== randomValue.word)
shuffleArray(words)
words[randomPlace] = randomValue
cardValues.value = words.slice(0, 4)
randomText.value = randomValue

async function getPhoto(wordValue: string) {
  await useLessonsStore().getPhoto(wordValue).then((value) => {
    photoUrl.value = value?.data.hits[0].webformatURL
  })
}

getPhoto(randomValue.word)

//https://pixabay.com/api/?key=43739713-5853d22ee946b4f02485c3114&q=yellow+flowers&image_type=photo&pretty=true

async function okey(event: Event, word: Word) {
  if (props.lesson.words.length == answers.value.length+10) {
    useUserStore().completeLesson(props.lesson, 10)
    //TODO сделать запрос на сервер для добавления правильных ответов и денег
  }
  const ev = event.target as HTMLButtonElement
  ev.style.backgroundColor = 'green'
  ev.disabled = true
  setTimeout(async () => {
    cardValues.value = []
    walidWords = walidWords.filter((w: Word) => w.word !== word.word)
    answers.value.push(word)
    words = await JSON.parse(JSON.stringify(props.lesson.words))
    let random = Math.round(Math.random() * (walidWords.length - 1))
    let randomPlace = Math.round(Math.random() * 3)
    let randomValue = walidWords[random]
    words = words.filter((w: Word) => w.word !== randomValue.word)
    shuffleArray(words)
    words[randomPlace] = randomValue
    cardValues.value = words.slice(0, 4)
    randomText.value = randomValue
    getPhoto(randomValue.word)

  }, 500)

}


function notOkey(event: Event) {
  const ev = event.target as HTMLElement
  ev.style.backgroundColor = 'red'
  useUserStore().removeHeart( )
}
</script>

<template>
  <div class="wrapper">
    <div class="cards">
      <img v-if="isLoading" :src="photoUrl" alt="photo" />
      <div v-else>
        <IconLoading/>
      </div>
      <h1>{{ answers.length + 1 }}/{{ lesson.words.length }}</h1>
      <h3>{{ randomText.translate }}</h3>
      <div v-for="(word, index) in cardValues" :key="index" class="card">
        <EAButton v-if="word === randomText" @click="(event) => okey(event,word)" style="color: #2fdc2f">{{ word.word }}
        </EAButton>
        <EAButton v-else @click="notOkey">{{ word.word }}</EAButton>
      </div>
    </div>
  </div>
  <EAModal v-if="lesson.words.length == answers.length+1">
    <div class="center">
      <div class="test">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-0.5 -0.5 24 24"
             id="Check-Thick--Streamline-Plump.svg" class="check"
             height="24" width="24">
          <g id="check-thick--check-form-validation-checkmark-success-add-addition-1-tick">
            <path id="Vector 7 (Stroke)" fill-rule="evenodd" stroke="#000000" stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.658716666666667 4.563104166666666C22.167352083333334 5.25650625 22.054220833333336 6.1901625000000005 21.580900000000003 6.907954166666667C17.151243750000003 13.618635416666669 13.960952083333334 17.695385416666667 12.195797916666669 19.805108333333333C11.320264583333334 20.850889583333334 9.799581250000001 20.927699999999998 8.809335416666666 19.988820833333335C6.2301729166666675 17.536302083333332 3.806404166666667 14.925322916666666 1.5521645833333335 12.171120833333335C0.9241687500000001 11.401435416666667 0.7944104166666667 10.315212500000001 1.4058270833333333 9.532014583333334C1.9372708333333335 8.851070833333335 2.5439916666666664 8.266679166666666 3.0925416666666665 7.803756250000001C4.002383333333333 7.035652083333334 5.315970833333334 7.210020833333334 6.133908333333333 8.075683333333334C8.657775 10.749577083333334 10.178985416666666 12.6169375 10.178985416666666 12.6169375S12.679516666666668 8.963195833333334 16.6913875 3.3424270833333334C17.312627083333332 2.47206875 18.419645833333334 2.0667416666666667 19.354883333333333 2.5852C20.10588125 3.0019791666666666 20.978827083333336 3.63615625 21.658716666666667 4.562577083333334Z"
                  clip-rule="evenodd" stroke-width="1"></path>
          </g>
        </svg>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="150" height="150" class="circle">
          <circle cx="50" cy="50" r="45" />
        </svg>
        <div class="congratulations">
          <h2>Молодец!</h2>
          <div class="coinsCenter">
            <h3>+ 10</h3>
            <IconCoin :width="30"></IconCoin>
          </div>
        </div>
      </div>
    </div>
  </EAModal>
  <div class="line">
    <div class="colorLine" :style="{width: 100 * (answers.length+1)/lesson.words.length + '%'}"></div>
  </div>
</template>

<style scoped>
.wrapper{
  width: 100%;
  display: flex;
  justify-content: center;
}

.cards {
  width: 500px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 20px;
}

.card, button {
  width: 100%;
}

h1, h3, img {
  grid-column: 1/3;
}

img {
  width: 400px;
  height: 200px;
  object-fit: cover;
}

.test {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}

.circle {
  position: relative;
  top: -85px;
  animation: 2s linear forwards svg-animation;
}


@keyframes svg-animation {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg)
  }
}

.center {
  width: 100%;
  display: flex;
  justify-content: center;
}

circle {
  animation: 1.4s ease-in-out forwards circle-animation;
  display: block;
  fill: transparent;
  stroke: #2f3d4c;
  stroke-linecap: round;
  stroke-dasharray: 283;
  stroke-dashoffset: 280;
  stroke-width: 5px;
  transform-origin: 50% 50%;
}

@keyframes circle-animation {
  from {
    stroke-dashoffset: 360;
    transform: rotate(0);
    stroke: #2f3d4c;
  }
  to {
    stroke-dashoffset: 0;
    stroke: #2fdc2f;
    transform: rotate(360deg);
  }
}

@keyframes circle-stroke-animation {
  from {
    stroke: #2f3d4c;
  }
  to {
    stroke: #2fdc2f;
  }
}

.check {
  position: relative;
  z-index: 1;
  top: 50px;
  width: 110px;
  height: 110px;

}

.check path {
  animation: 1.4s ease-in-out forwards circle-stroke-animation;
  background: black;
}

.congratulations {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  font-size: 30px;
  color: black;
  top: -65px;
  animation: 1.4s ease-in-out forwards congratulations-animation;
}

.congratulations h2 {
  font-size: 30px;
  color: black;
}

.congratulations h3 {
  color: black;
  font-size: 20px;
}

.coinsCenter {
  display: flex;
  align-items: center;
  gap: 10px;
}

@keyframes congratulations-animation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.line {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: var(--text-secondary-color);
  height: 10px;
}

.colorLine {
  height: 10px;
  background: #2fdc2f;
  transition: 0.3s;
  border-radius: 20px;
}


</style>

