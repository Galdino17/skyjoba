import { Avatar, Text, Button } from '@chakra-ui/react'
import  Router  from 'next/router'
import styles from './styles.module.css'

export default function UserIcon(props) {

  const desloga = () => {
    props.logout()
    Router.push("/")
  }

    return (
      <div className={styles.user}>
        <Avatar
          src= {props.src}
          description={props.description}
          squared
          size="lg"
          color="success"
          text='Foto aqui'
        />
        <div className={styles.button}>
          <Text fontSize='lg'>
            {props.name}
          </Text>
          <Button colorScheme='teal' variant='ghost' onClick={() => desloga()}> Sair </Button>
          
        </div>
      </div>
    );
  }