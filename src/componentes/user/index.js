import { User, Text, Button } from "@nextui-org/react";
import styles from './styles.module.css'

export default function UserIcon(props) {
    return (
      <div className={styles.user}>
        <User
          src= {props.src}
          description={props.description}
          squared
          size="lg"
          color="success"
          text='Foto aqui'
        />
        <div className={styles.button}>
          <Text h5>
            {props.name}
          </Text>
          <Button size="xs" rounded flat>Sair</Button>
        </div>
      </div>
    );
  }