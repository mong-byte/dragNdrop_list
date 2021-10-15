<template>
  <div class="drag_container">
    <div class="drag_section">
      <ul>
        <li
          :draggable="true"
          :id="item.id"
          :data-position="item.id"
          @dragover="overDrag"
          @dragstart="startDrag"
          @dragend="endDrag"
          @drop="dropDrag"
          v-for="item in listData"
          :key="item.id"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { ItemType } from "@/utils/types";
import { swapArr } from "@/utils/utilFunc";

export default defineComponent({
  name: "App",
  setup() {
    const state = reactive({
      listData: [
        { id: 1, name: "one" },
        { id: 2, name: "two" },
        { id: 3, name: "three" },
        { id: 4, name: "four" },
        { id: 5, name: "five" },
      ] as ItemType[],
      isDraging: null as null | HTMLElement,
    });

    const { listData, isDraging } = toRefs(state);

    const overDrag = (event: DragEvent) => {
      event.preventDefault();
    };
    const startDrag = (event: DragEvent) => {
      const target = event.currentTarget as HTMLElement;
      const dataTransfer = event.dataTransfer as DataTransfer;
      isDraging.value = target;

      dataTransfer.effectAllowed = "move";
      event.dataTransfer?.setData("text/html", target.id);
    };

    const endDrag = (event: DragEvent) => {
      const dataTransfer = event.dataTransfer as DataTransfer;
      dataTransfer.dropEffect = "move";
    };

    const dropDrag = (event: DragEvent) => {
      const target = event.target as HTMLElement;
      console.log(isDraging.value);
      console.log(target);

      const from = Number(isDraging.value?.dataset.position) - 1;
      const to = Number(target.dataset.position) - 1;
      console.log("from : ", from);
      console.log("to : ", to);

      const list = swapArr(listData.value, from, to);
      listData.value = list;
    };

    return { startDrag, dropDrag, overDrag, endDrag, listData };
  },
  components: {},
});
</script>

<style lang="scss">
.drag_container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1080px;
}

.drag_section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;

  &:first-child {
    background-color: tomato;
  }
  /* 
  &:nth-child(2) {
    background-color: violet;
  }

  &:last-child {
    background-color: yellow;
  } */
}
</style>
