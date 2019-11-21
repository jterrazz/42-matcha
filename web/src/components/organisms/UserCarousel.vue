<template>
  <div>
    <b-button @click="prevSlide">Prev</b-button>
    <b-button @click="nextSlide">Next</b-button>
    <Flickity
      ref="flickity"
      :options="flickityOptions"
      :key="users"
    >
      <div v-for="u in users" :key="u.id" class="w-33 carousel-cell">
        <UserPreview :user="u" class="mr-3" />
      </div>
    </Flickity>
  </div>
</template>

<script>
    import Flickity from "vue-flickity";
  import UserPreview from "../molecules/UserPreview";

  export default {
      name: "UserCarousel",
      components: {
          UserPreview,
          Flickity
      },
      props: {
          users: {
              type: Array,
              required: true
          }
      },
      data: () => ({
          flickityOptions: {
              adaptiveHeight: true,
              // wrapAround: true,
              contain: true,
              groupCells: true
              // autoPlay: 5000
          },
          selectedCell: 0
      }),
      computed: {
          maxSelectedCell: function() {
              if (!this.users) return 0;
              return this.users.length / 3 - 1;
          }
      },
      watch: {
          selectedCell: function (val) {
              this.$refs.flickity.select(val);
          }
      },
      methods: {
          nextSlide() {
              if (this.selectedCell < this.maxSelectedCell)
                  this.selectedCell++;
          },
          prevSlide() {
              if (this.selectedCell > 0)
                  this.selectedCell--;
          }
      },
  }
</script>
