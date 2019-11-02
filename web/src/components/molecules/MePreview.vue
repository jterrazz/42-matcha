<template>
    <section class="bg-white overflow-hidden rounded shadow-sm">
        <CenterImage square>
            <div class="position-absolute" style="bottom: 0; right: 0;">
                <img src="../../assets/heart.svg" class="w-md">
            </div>
        </CenterImage>

        <div class="p-3 bg-primary text-white">
            <h4>{{ firstName }} {{ lastName }}</h4>
            <p>{{ postalAddress }}</p>
            <p>{{ description }}</p>
            <router-link to="/">Access profile</router-link>
        </div>
    </section>
</template>

<script>
    import CenterImage from "../atoms/CenterImage";

    export default {
        name: "ProfilePreview",
        components: {CenterImage},
        props: {
            firstName: String,
            lastName: String,
            postalAddress: String,
            description: String
        }
    }
</script>