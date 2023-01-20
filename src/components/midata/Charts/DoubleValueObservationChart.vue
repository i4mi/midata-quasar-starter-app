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
 * Observation that have 2 values. A working example is a Blood pressure
 * graph.
 */
export default defineComponent({
  name: 'DoubleValueObservationChart',
  components: {},
  props: {
    data: Array as PropType<Observation[]>,
    observationType: String,
    unit: String,
    min: Number,
    max: Number

  },
  data() {
    return {}
  },
  computed: {
    labels(){
      if (this.data.length != 0){
        return [this.data[0].component[0].code.coding[0].display,
          this.data[0].component[1].code.coding[0].display]
      }
      else {
        return ['', '']
      }
    },
    series() {
      return [
        {
          //Tood change this label
          name: this.labels[0],
          data: this.data.map(obs => {
            return obs.component[0].valueQuantity.value
          })
        },
        {
          name: this.labels[1],
          data: this.data.map(obs => {
            return obs.component[1].valueQuantity.value
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
        }
      }
    }
  },
  methods: {},
});
</script>
