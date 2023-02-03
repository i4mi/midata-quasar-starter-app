<template>
  <q-card>
    <apexchart :series='series' :options='chartOptions' :height='400' :type='"scatter"' />
  </q-card>
</template>

<script setup lang='ts'>
/**
 * Chart designed to use fhir Observations. Its intended usage is one type of
 * Observation that have 2 values. A working example is a Blood pressure
 * graph.
 */
import { defineProps, computed } from 'vue';
import type { PropType } from 'vue'
import { Observation } from '@i4mi/fhir_r4';
import { useQuasar } from 'quasar';
import { moment } from 'boot/plugins';

const props = defineProps({
  data: Array as PropType<Observation[]>,
  observationType: String,
  unit: String,
  min: Number,
  max: Number
})

const $q = useQuasar()

const labels = computed(() => {
  if (props.data.length != 0){
    return [props.data[0].component[0].code.coding[0].display,
      props.data[0].component[1].code.coding[0].display]
  }
  else {
    return ['', '']
  }
})
const series = computed(() => {
  return [
    {
      name: labels.value[0],
      data: props.data.map(obs => {
        return obs.component[0].valueQuantity.value
      })
    },
    {
      name: labels.value[1],
      data: props.data.map(obs => {
        return obs.component[1].valueQuantity.value
      })
    }]
})
const chartOptions = computed(() => {
  return {
    chart: {
      id: `chart-${props.observationType}`,
    },
    title: {
      text: `${props.observationType} Observationen`,
      align: 'center',
      offsetY: 15,
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: $q.screen.lt.sm ? 5 : 10
    },
    xaxis: {
      labels: {
        show: false
      },
      tickPlacement: 'between',
      tooltip: {
        enabled: false
      },
      categories: props.data.map(obs => {
        return moment(obs.issued).format('ll HH:mm')
      })
    },
    yaxis: {
      min: $q.screen.lt.md ? undefined : Math.min(...props.data.map(o => o.component[1].valueQuantity.value)),
      max: $q.screen.lt.md ? undefined : Math.max(...props.data.map(o => o.component[0].valueQuantity.value)),
      title: {
        text: `${props.observationType} in ${props.unit}`,
        align: 'center',
        style: {
          fontSize: '14px',
        },
      }
    }
  }
})
</script>
