<template>
  <b-container class="p-5">
    <b-row>
      <b-col md="3">
        <MePreview
          :first-name="me.firstName"
          :last-name="me.lastName"
          :postal-address="me.postalAddress"
          :description="me.description"
        ></MePreview>
        <ContactsList class="mt-4"></ContactsList>
      </b-col>
      <b-col md="9">
        <router-link :to="{ name: 'discover' }">
          <div
            class="rounded gd-m p-3 text-center text-white font-weight-bolder"
          >
            Meet new people
          </div>
        </router-link>

        <h2 class="mt-3">They liked me</h2>
        <Flickity ref="flickity" :options="flickityOptions">
          <ProfilePreview v-for="u in me.likedBy" class="carousel-cell" />
        </Flickity>

        <h2>They saw my profile</h2>
        <Flickity ref="flickity" :options="flickityOptions">
          <ProfilePreview v-for="u in me.likedBy" class="carousel-cell" />
        </Flickity>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Flickity from "vue-flickity";

import MePreview from "../molecules/MePreview";
import ContactsList from "../organisms/ContactsList";
import ProfilePreview from "../molecules/ProfilePreview";

export default {
  name: "HomePage",
  components: {
    ProfilePreview,
    MePreview,
    ContactsList,
    Flickity
  },
  data: () => ({
    flickityOptions: {
      // wrapAround: true,
      contain: true,
      groupCells: true
      // autoPlay: 5000
    },
    me: {
      firstName: "Jean-Baptiste",
      lastName: "Terrazzoni",
      postalAddress: "75017 Paris",
      description: "Amazing description bla bl al lbal bl bll bla",
      likedBy: [
        {
          firstName: "Jean-Baptiste",
          lastName: "Terrazzoni",
          postalAddress: "75017 Paris"
        },
        {
          firstName: "Jean-Baptiste",
          lastName: "Terrazzoni",
          postalAddress: "75017 Paris"
        },
        {
          firstName: "Jean-Baptiste",
          lastName: "Terrazzoni",
          postalAddress: "75017 Paris"
        },
        {
          firstName: "Jean-Baptiste",
          lastName: "Terrazzoni",
          postalAddress: "75017 Paris"
        },
        {
          firstName: "Jean-Baptiste",
          lastName: "Terrazzoni",
          postalAddress: "75017 Paris"
        },
        {
          firstName: "Jean-Baptiste",
          lastName: "Terrazzoni",
          postalAddress: "75017 Paris"
        },
        {
          firstName: "Jean-Baptiste",
          lastName: "Terrazzoni",
          postalAddress: "75017 Paris"
        }
      ]
    }
  })
};
</script>

<style lang="scss">
.carousel-cell {
  width: 25%;
  margin-right: 10px;
}

.flickity-button {
  background: #333;
}
.flickity-button:hover {
  background: #f90;
}

.flickity-prev-next-button {
  width: 30px;
  height: 30px;
  border-radius: 5px;
}
/* icon color */
.flickity-button-icon {
  fill: white;
}
/* position outside */
.flickity-prev-next-button.previous {
  left: -40px;
}
.flickity-prev-next-button.next {
  right: -40px;
}
</style>
