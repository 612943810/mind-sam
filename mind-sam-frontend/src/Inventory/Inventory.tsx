import Button from "../Button/Button";
import Navigation from "../navigation/Navigation";
function Test(){
   alert("HelloRes")

}
export default function Inventory(){
    return(
  <>
<Navigation />
<div className='createButton'>
    <Button text="Test"  clickAction={Test}/>
</div>
<div className='chatBar'>
        <body>


        </body>

    </div>
    </>      
    )


}
