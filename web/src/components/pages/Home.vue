<template>
    <b-container class="p-5">
        <b-row>
            <b-col md="3">
                <MePreview :first-name="me.firstName" :last-name="me.lastName" :postal-address="me.postalAddress" :description="me.description"></MePreview>
                <ContactsList class="mt-4"></ContactsList>
            </b-col>
            <b-col md="9">
                <b-row>
                    <b-col class="bg-white border rounded border-warning">Suggestions</b-col>
                    <b-col>Search people</b-col>
                </b-row>

                <h2>They liked me</h2>
                <flickity ref="flickity" :options="flickityOptions">
                    <ProfilePreview v-for="u in me.likes" class="carousel-cell"/>
                </flickity>

                <h2>They saw my profile</h2>
                <flickity ref="flickity" :options="flickityOptions">
                    <ProfilePreview v-for="u in me.likes" class="carousel-cell"/>
                </flickity>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import Flickity from 'vue-flickity';

    import MePreview from '../molecules/MePreview'
    import ContactsList from '../organisms/ContactsList'
    import ProfilePreview from "../molecules/ProfilePreview";

    export default {
        name: 'HomePage',
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
                groupCells: true,
                // autoPlay: 5000
            },
            me: {
                firstName: 'Jean-Baptiste',
                lastName: 'Terrazzoni',
                postalAddress: '75017 Paris',
                description: 'Amazing description bla bl al lbal bl bll bla',
                likes: [
                    {
                        firstName: 'Jean-Baptiste',
                        lastName: 'Terrazzoni',
                        postalAddress: '75017 Paris',
                    },{
                        firstName: 'Jean-Baptiste',
                        lastName: 'Terrazzoni',
                        postalAddress: '75017 Paris',
                    },{
                        firstName: 'Jean-Baptiste',
                        lastName: 'Terrazzoni',
                        postalAddress: '75017 Paris',
                    },{
                        firstName: 'Jean-Baptiste',
                        lastName: 'Terrazzoni',
                        postalAddress: '75017 Paris',
                    },{
                        firstName: 'Jean-Baptiste',
                        lastName: 'Terrazzoni',
                        postalAddress: '75017 Paris',
                    },{
                        firstName: 'Jean-Baptiste',
                        lastName: 'Terrazzoni',
                        postalAddress: '75017 Paris',
                    },{
                        firstName: 'Jean-Baptiste',
                        lastName: 'Terrazzoni',
                        postalAddress: '75017 Paris',
                    },
                ]
            },
        })
    }
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
        background: #F90;
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