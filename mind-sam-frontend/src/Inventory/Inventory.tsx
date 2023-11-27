import './Inventory.css';
import Button from "../Button/Button";
import Navigation from "../navigation/Navigation";
function Test(){
   alert("HelloRes")

}
export default function Inventory(){
    return(
  <>
  <div className='navigation'>
 <Navigation  />   
  </div>

<div className='createButton'>
    <Button text="Create"  clickAction={Test} backgroundColor='#15b097ff' color='#fbc3bcff'/>
</div>
<div className='chatBar'>
        <body>


        </body>

    </div>
    </>      
    )


}
