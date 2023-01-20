<template>
  <q-card>
    <apexchart :series='series' :options='chartOptions' :height='400' :type='"scatter"' />
  </q-card>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import type { PropType } from 'vue'
import { Observation } from '@i4mi/fhir_r4';

/**
 * Chart designed to use fhir Observations. Its intended usage is one type of
 * Observation that only have single values. A working example is a Body temperature
 * graph. A not working example is a blood pressure graph as it consists of
 * a composite value or a combined graph of multiple Observation Types
 */
export default defineComponent({
  name: 'SingeTypeObservationChart',
  components: {},
  props: {
    data: Array as PropType<Observation[]>,
    observationType: String,
    unit: String,
    max: Number,
    min: Number

  },
  data() {
    return {}
  },
  computed: {
    series() {
      return [{
        name: this.observationType,
        data: this.data.map(obs => {
          return obs.valueQuantity.value
        })
      }]
    },
    chartOptions() {
      return {
        chart: {
          id: `chart-${this.observationType}`,
        },
        title: {
          text: `${this.observationType} Observationen`,
          align: 'center',
          offsetY: 15,
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 10
        },
        xaxis: {
          labels: {
            show: false
          },
          tickPlacement: 'between',
          tooltip: {
            enabled: false
          },
          categories: this.data.map(obs => {
            return this.$moment(obs.issued).format('ll HH:mm')
          })
        },
        yaxis: {
          min: this.min,
          max: this.max,
          title: {
            text: `${this.observationType} in ${this.unit}`,
            align: 'center',
            style: {
              fontSize: '14px',
            },
          }
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
            opacityTo: 1
          }
        }
      }
    }
  },
  methods: {},
});
</script>
