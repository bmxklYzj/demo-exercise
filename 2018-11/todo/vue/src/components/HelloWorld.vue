<template>
  <div class="hello">
    <header class="header">
      <img src="../assets/head-image.webp" alt="background-image">
      <div class="header-sayings">
        <span class="header-sayings-text">No pains, no gains.</span>
      </div>
      <div class="header-input">
        <input @keyup.enter="add" v-model="inputValue" placeholder="Nothing is impossible only if you do it.">
        <i @click="add" class="iconfont icon-add"></i>
      </div>
    </header>

    <section class="todo-list">
      <ul>
        <li v-for="(item, index) in todoList" :key="index">
          <label class="todo-list-wrap"
            @touchstart="itemTouchStart"
            @touchmove="itemTouchMove($event, item)"
          >
            <input type="checkbox" class="iconfont checkbox">
            <p class="todo-list-item" :data-id="item.id">{{item.todo}}</p>
          </label>
        </li>
      </ul>
    </section>

  </div>
</template>

<script>
import DataBase from "../database/database";
let dataBase = new DataBase();

export default {
  name: "HelloWorld",
  props: {

  },
  data() {
    return {
      inputValue: '',
      todoList: dataBase.get()
    };
  },
  mounted() {
    console.log(dataBase);
  },
  methods: {
    updateTodoList() {
      this.todoList = dataBase.get();
    },
    add() {
      if (!this.inputValue.trim()) {
        alert('write down your todo');
        return;
      }
      dataBase.add(this.inputValue);
      this.inputValue = '';
      this.updateTodoList();
    },
    itemTouchStart($event) {
      this.touchStartCoordinate = {
        x: $event.changedTouches[0].clientX,
        y: $event.changedTouches[0].clientY,
        target: $event.changedTouches[0].target
      };
    },
    itemTouchMove($event, item) {
      if (Math.abs($event.changedTouches[0].clientX - this.touchStartCoordinate.x) > 20) {
        if (
          document.elementFromPoint(
            $event.changedTouches[0].clientX,
            $event.changedTouches[0].clientY
          )
          === this.touchStartCoordinate.target
        ) {
          if (confirm(`是否删除: ${item.todo} ?`)) {
            dataBase.remove(item.id);
            this.updateTodoList();
          }
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
ul {
  list-style: none;
  padding-left: 0;
}
.checkbox {
  position: relative;
  -webkit-appearance: none; // 去掉checkbox默认样式
  outline: 0; // focus时会有outline，去掉
  &::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 2rem;
    height: 2rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
}
.checkbox:checked::after {
  content: "\e65d";
  position: absolute;
  font-size: 20px;
  color: #3c0;
}
.line-clamp(@line) {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: @line;
  -webkit-box-orient: vertical;
}

@gap: 2rem;
.header {
  @boder-radius: 0.3rem;
  position: relative;
  img {
    width: 100%;
    height: 20rem;
    opacity: 0.8;
  }
  &-sayings {
    position: absolute;
    top: @gap;
    right: @gap;
    font-size: 2rem;
    text-align: right;
    background-color: #ffe5d6;
    padding: 0.5rem 1rem;
    border-radius: @boder-radius;
    &-text {
      color: #fff;
    }
  }
  &-input {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%); // 为美观，竖直方向不用居中

    width: 100%;
    padding: 0 @gap;
    input {
      width: 100%;
      outline: none;
      padding: 1rem;
      font-size: 1.5rem;
      border: none;
      border-radius: @boder-radius;
    }
    //input:focus + .icon-add {
    //    display: none;
    //}
    .icon-add {
      position: absolute;
      top: 50%;
      right: @gap + 1rem;
      transform: translateY(-50%);
    }
  }
}

.todo-list {
  margin: @gap;
  &-wrap {
    display: flex;
    height: 3rem;
  }
  &-item {
    margin: 0;
    margin-left: 4rem;
    line-height: 2rem;
    .line-clamp(1);
    pointer-events: none;
  }
}
</style>
