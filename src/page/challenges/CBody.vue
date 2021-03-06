<template lang="pug">
.c-body(
  :style="{order: order}"
)
  h1.title {{ challenge.title }}

  .closebox(
    @click="closeHandle(challenge.id)"
  )
    svg.icon(aria-hidden="true")
      use(xlink:href="#icon-close")

  h2.subtit Description
  div.content
    p {{ challenge.description }}
    .links
      a.link(
        v-for="(atta, i) in challenge.attachments"
        :href="atta"
        target="_blank"
      ) {{ `Link ${i}` }}

  h2.subtit.hint Hint&nbsp;&nbsp;
    svg.icon.-delay(
      aria-hidden="true"
      :class="{'-rotate': isShowHint }"
      @click="toggleHint()"
    )
      use(xlink:href="#icon-more")

  div.content
    transition(name='hint')
      p(v-if="isShowHint") {{ challenge.hint ? challenge.hint : 'NO HINT'}}
        code(v-if="!challenge.hint") {{ "  (╯°口°)╯(┴—┴" }}

  h2.subtit Your Answer
  div.content
    m-input.flaginput(
      v-model="flag"
      :theme="theme"
      :placeholder="placeholder"
    )
    m-button.submitbutton(
      :text="buttonText"
      :theme="theme"
      :clickHandle="submitHandle"
    )

  h2.subtit Completed
    span.pwnedtimes {{ challenge.pwned_times ? `${challenge.pwned_times} times` : '' }}
  div.content
    p
      span.pwnername(
        v-for="(pwner, i) in challenge.early_pwner"
        v-if="i < 10"
        :key="i"
      ) {{ pwner }}
</template>

<script>
import MInput from '@/MInput'
import MButton from '@/MButton'

export default {
  name: "c-body",
  props: [
    "order",
    "challenge",
      // "title",
      // "description",
      // "hint",
      // "attachments",
      // "points",
      // "is_solved",
      // "pwned_times",
      // "early_pwner"
    "closeHandle"
  ],
  data: function() {
    return {
      isShowHint: false,
      flag: "",
      theme: "",
      placeholder: "",
      buttonText: ""
    }
  },
  activated: function() {
    this.isShowHint = false
    this.flag = ""
    if (this.challenge.is_solved) {
      this.theme = "success"
      this.placeholder = "Congratz, you have solved it."
      this.buttonText = "Solved"
    } else {
      this.theme = ""
      this.placeholder = "AAA{here_is_your_flag}"
      this.buttonText = "Submit"
    }
  },
  methods: {
    toggleHint() {
      this.isShowHint = !this.isShowHint
    },
    submitHandle() {
      if (this.challenge.is_solved)
        return

      this.$store.dispatch('submitFlag', {
        flag: this.flag,
        challenge: this.challenge,
      }).then(() => {
        this.theme = 'success'
        this.buttonText = "Solved"
      }).catch(() => {
        this.theme = 'error'
        this.buttonText = "Retry"
      })
    },
  },
  components: {
    MInput, MButton
  }
}
</script>

<style lang="stylus">

@import "../../stylus/mixins"

.c-body
  position relative
  width 100%
  margin 20px
  padding 40px
  padding-bottom 25px
  background-color #181818
  color #eee

  >.title
    margin 0 auto
    text-align center
    font-size 36px
    font-weight bold
    font-style italic
    color #E1C79B

  >.closebox
    position absolute
    top 0
    right 0
    width 130px
    height 120px
    display flex
    justify-content center
    align-items center
    font-size 20px
    color #ccc
    cursor pointer

    >.icon
      visibility hidden

    &:hover>.icon
      visibility visible
      transform rotate(540deg)
      transition-duration 1.5s
      transition-timing-function linear

  >.subtit
    display inline-block
    margin 0 110px
    margin-top 30px
    font-size 22px
    font-weight normal
    // font-style italic
    text-align left
    color #ccc

  >.hint .icon
    cursor pointer
    &:hover
      >svg
        visibility visible

    &.-rotate
      transform rotate(90deg)


  >.content
    box-sizing border-box
    width 666px
    margin 10px 0 15px 110px
    padding-left 35px
    padding-right 20px
    // border 1px solid #fff
    font-size 14px
    color #aaa

    >p
      margin .8em 0
      line-height 1.6
      // letter-spacing 1px
      white-space pre-wrap
      // word-wrap wrap
      overflow hidden
      text-overflow ellipsis

    >.links
      margin-top 25px
      margin-bottom -20px

    .link
      display inline-block
      width 70px
      height 26px
      line-height 26px
      margin-right 10px
      text-align center
      color #999
      background-color #222
      border-radius 2px
      text-decoration none
      &:hover
        text-decoration underline

    >.flaginput
      width 480px
      text-align center

    >.submitbutton
      margin-left 20px

    .pwnername
      margin-right 16px
      // font-weight bold
      // font-style italic

  .pwnedtimes
    margin-left 2em
    font-size 16px
    // font-style italic
    color #555

  .-delay
    transition-property transform
    transition-duration .5s

  .hint-enter-active
    transition all 1s
  .hint-leave-active
    transition all .5s

  .hint-enter,
  .hint-leave-to
    opacity 0
</style>
