<template>
    <nav class="bg-white p-3 shadow-sm rounded">
        <h3 class="section-title">Contacts</h3>
        <div class="dropdown-divider"/>
        <ContactRow name="JB" last-message="hello commeeer fe rfe e" class="mt-3"></ContactRow>
    </nav>
</template>

<script>
    import ContactRow from '../molecules/ContactRow'

    export default {
        name: 'ContactsList',
        components: {
            ContactRow
        }
    }
</script>