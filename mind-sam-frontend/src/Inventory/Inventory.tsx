import '../index.css'
import './Inventory.css';
import Button from "../Button/Button";
import Navigation from "../navigation/Navigation";
function Test(){
   alert("HelloRes")

}
export default function Inventory(){
    return(
  <>
<div className='grid'>
    <div className='navigation'>
     <Navigation  />       
    </div>
<h1 className='title'>Inventory Details</h1>
<div className='createButton'>
    <Button text="Create"  clickAction={Test} backgroundColor='#084b83ff' color='#fbc3bcff'/>
</div>
<table className='tableDesign'>
    <thead>
        <th>Id</th>
        <th>Name</th>
        <th>Description</th>
    </thead>
    <tbody>
        <td>Test</td>
        <td>Test</td>
        
    </tbody>
</table>   
</div>

   

 
    </>      
    )


}
