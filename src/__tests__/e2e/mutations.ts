import gql from "graphql-tag";

export const SIGNUP_MUTATION = gql`
    mutation SignUp($input:UserInput) {
        signup(input: $input) {
            email
            username
        }
    }
`
export const LOGIN_MUTATION = gql`
    mutation Login($email:String!, $password:String!){
        login(email: $email, password: $password) {
            token
        }
    }
`
