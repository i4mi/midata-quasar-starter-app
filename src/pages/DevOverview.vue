<template>
  <div class="q-pa-md">
    <q-carousel
      swipeable
      animated
      v-model="slide"
      :autoplay="autoplay"
      ref="carousel"
      infinite
    >
      <q-carousel-slide :name="1" class="column no-wrap flex-center">
        <q-img
          src="../assets/overview/undraw_pair_programming_re_or4x.svg"
          height="150px"
          fit="contain"
        />
        <div class="q-mt-md text-center text-h3 text-weight-thin">
          Web- <br/> entwicklung
        </div>
        <q-btn to="/developmentBasics" class="midata-fade text-white">Los gehts!</q-btn>
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="column no-wrap flex-center">
        <q-img
          src="../assets/overview/undraw_doctors_hwty.svg"
          height="150px"
          fit="contain"
        />
        <div class="q-mt-md text-center text-h3 text-weight-thin">Midata</div>
        <q-btn to="/midata/introduction" class="midata-fade text-white">Los gehts!</q-btn>
      </q-carousel-slide>
      <template v-slot:control>
        <q-carousel-control
          position="top-right"
          :offset="[5, 5]"
          class="text-black rounded-borders"
        >
          <q-toggle
            flat
            dense
            color="primary"
            v-model="autoplay"
            label="Auto Play"
          />
        </q-carousel-control>

        <q-carousel-control
          position="bottom-right"
          :offset="[5, 5]"
          class="q-gutter-xs"
        >
          <q-btn
            flat
            color="primary"
            text-color="black"
            icon="arrow_left"
            @click="($refs.carousel as any).previous()"
          />
          <q-btn
            flat
            color="primary"
            text-color="black"
            icon="arrow_right"
            @click="($refs.carousel as any).next()"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const slide = ref(1)
const autoplay = ref(true)
</script>
