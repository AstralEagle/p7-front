import {Text} from 'react-native'

export default function Post(props){

    const name = props.valuName;
    const description = props.valuDesc;
    console.log(props.valuDesc);
    console.log(description);

    return(
        <div>
            <h3>{name}</h3>
            <Text>{description}</Text>
        </div>
    )
}
