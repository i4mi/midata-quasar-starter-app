<template>
  <q-card>
    <apexchart
      :series="series"
      :options="chartOptions"
      :height="400"
      :type="'scatter'"
    />
  </q-card>
</template>

<script setup lang="ts">
/**
 * Chart designed to use fhir Observations. Its intended usage is one type of
 * Observation that only have single values. A working example is a Body temperature
 * graph. A not working example is a blood pressure graph as it consists of
 * a composite value or a combined graph of multiple Observation Types
 */
import { computed } from 'vue';
import type { PropType } from 'vue';
import { Observation } from '@i4mi/fhir_r4';
import { useQuasar } from 'quasar';
import { useUserStore } from 'stores/user';

const $q = useQuasar();
const store = useUserStore();

const props = defineProps({
  data: Array as PropType<Observation[]>,
  observationType: String,
  unit: String,
});

const series = computed(() => {
  return [
    {
      name: props.observationType,
      data: props.data.map((obs) => {
        return obs.valueQuantity.value;
      }),
    },
  ];
});
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
      enabled: false,
    },
    markers: {
      size: $q.screen.lt.sm ? 5 : 10,
    },
    xaxis: {
      labels: {
        show: false,
      },
      tickPlacement: 'between',
      tooltip: {
        enabled: false,
      },
      categories: props.data.map((obs) => {
        return new Intl.DateTimeFormat(store.currentLanguage, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }).format(Date.parse(obs.issued));
      }),
    },
    yaxis: {
      min: $q.screen.lt.md
        ? undefined
        : Math.min(...props.data.map((o) => o.valueQuantity.value)),
      max: $q.screen.lt.md
        ? undefined
        : Math.max(...props.data.map((o) => o.valueQuantity.value)),
      title: {
        text: `${props.observationType} in ${props.unit}`,
        align: 'center',
        style: {
          fontSize: '14px',
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        colors: ['#087add', '#32c6b6'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
      },
    },
  };
});
</script>
