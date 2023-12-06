import useAuth from "../hooks/useAuth"
import UserImageProfile from "./UserImageProfile"
//EL MENSAJE SE MANDA, PERO AL LLEGAR, PARECE QUE HAY UN PROBLEMA.
//CHECKEA SI LOS MENSAJES DES DEL USUARIO AUTHENTICADO TERMINAN DEL LADO DERECHO, CREO QUE HAY QUE EDITAR
// ESTE DIV (EL DIV MAS GRANDE DE ESTE COMPONENTE)

/**
 * 
 * @param {Object} param.item - message's information.
 * @param {String} param.item.messageId - message's id.
 * @param {String} param.item.body - message's body.
 * @param {String} param.item.userOwner - message's owner username.
 * @returns {JSX.Element} card view for chats in chat container.
 */
export default function ChatMessage({ item }) {
    const { auth } = useAuth();

    return (
        <>
            {item.userOwner === auth.user.username ?   //auth user messages will got to the right
                <div className="hstack gap-1 mb-2 justify-content-end">
                    <div className="border rounded p-2">
                        <p className="m-0">{item.body}</p>                    
                    </div>
                    <div>
                        <UserImageProfile
                            imgWidth='60px'
                            imgHeight='60px'
                            img={item.image}
                        />
                    </div>
                </div>
                : // other user messages will got to the left.
                <div className="hstack gap-1 mb-2">
                    <div>
                        <UserImageProfile
                            imgWidth='60px'
                            imgHeight='60px'
                            img={item.image}
                        />
                    </div>
                    <div className="border rounded p-2">
                        <p className="m-0">{item.body}</p>                    
                    </div>
                </div>
            }


        </>
    )
}