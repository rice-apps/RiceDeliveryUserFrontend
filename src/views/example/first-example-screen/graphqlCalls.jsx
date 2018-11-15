import { graphql, Mutation, compose } from 'react-apollo';        
import gql from 'graphql-tag';


const updateOrder = gql`
    subscription Channels {
        subscriptionChannelAdded {
            id
            name
        }
    }
`;