<template>
    <b-container fluid class="container__auth">
        <b-row class="h-100-md">
            <b-col order-md="2" class="div__auth--primary d-flex align-items-center justify-content-center py-5 px-4 text-light gd-hot">
                <div class="auth-form__container w-100">
                    <div class="text-center p-3 p-md-5">
                        <h2>Welcome</h2>
                        <p>Glad to see you again</p>
                    </div>

                    <b-form @submit="onSubmit" @reset="onReset" class="form__auth">
                        <b-form-group
                                id="input-group-1"
                                label="Username"
                                label-for="input-1"
                        >
                            <b-form-input
                                    id="input-1"
                                    v-model="form.username"
                                    required
                                    placeholder="Enter username"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-2" label="Password" label-for="input-2">
                            <b-form-input
                                    id="input-2"
                                    v-model="form.password"
                                    required
                                    placeholder="Enter password"
                            ></b-form-input>
                        </b-form-group>

                        <router-link to="/reset-password" class="text-md-right text-center">
                            <p class="text-white small-text">Forgot password ?</p>
                        </router-link>

                        <b-button type="submit" variant="danger" class="w-100 rounded mt-2">Login</b-button>
                        <div class="d-flex flex-column p-3 d-md-none">
                            <router-link to="register" class="text-danger font-weight-bold align-self-end">Register</router-link>
                        </div>

                        <div>


                            <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }"/>
                            <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'linkedin' }"/>
                            <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'twitter' }"/>
                        </div>
                    </b-form>
                </div>
            </b-col>

            <b-col order-md="1" md="6" lg="7" class="d-flex flex-column align-items-center justify-content-center py-5 px-4">
                <img src="/images/love-0.png" style="width: 240px">
                <h1 class="mt-5 font-weight-lighter">Discover bl alds  asdl lsd as dals </h1>
                <p>Discover new peiple and a.d elf mwef weod k</p>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                },
            }
        },
        methods: {
            onSubmit(e) {
                e.preventDefault()
                alert(JSON.stringify(this.form))
                this.$router.push({ name: 'home' })
            },
            onReset(evt) {
                evt.preventDefault()
                // Reset our form values
                this.form.email = ''
                this.form.name = ''
                this.form.food = null
                this.form.checked = []
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "../../styles/_variables.scss";

    .container__auth {
        height: 100vh;
    }
    .small-text {
        font-size: 0.86rem;
    }

    .div__auth--primary {
        .text-light {
            color: lightslategrey !important;
        }
    }

    .auth-form__container {
        max-width: 350px;
    }

    .form__auth {
        input {
            background-color: $primary_darker;
            border: 0;
            color: white;
            font-weight: 500;
            &::placeholder {
                color: rgba(255, 255, 255, 0.4);
                opacity: 1;
            }
            &:focus {
                color: white;
                background-color: $primary_darkest;
            }
        }
    }
</style>