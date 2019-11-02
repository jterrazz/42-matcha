<template>
    <b-container class="p-5">
        <b-row>
            <b-col md="3">
                <ContactsList></ContactsList>
            </b-col>
            <b-col md="9" class="bg-white rounded shadow-sm">
                <h2 class="mt-3">Jean-Baptiste</h2>
                <p class="text-muted">Last message 2 years ago</p>

                <div class="dropdown-divider"/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import ContactsList from '../organisms/ContactsList'

    export default {
        name: 'MessagesPage',
        components: {
            ContactsList
        }
    }
</script>