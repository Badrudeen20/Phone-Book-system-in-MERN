import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Axios from 'axios'
import { Button, Container, FormControl, FormGroup, Nav ,Form,Alert} from 'react-bootstrap';
import { FilterLeft, PencilSquare, PersonCircle, Search, Trash } from 'react-bootstrap-icons';
export default class App extends Component {
 
   constructor(){
      super()
      this.state ={
         name:"",
         number:"",
         phoneBook:[],
         showForm:false,
         alert:false,
         search:false,
         person:"",
         edit:false,
         editName: "",
         editNumber: "",
         id:""
      }


//form name input function
this.handleName = (event)=>{
   this.setState({
     name:event.target.value
   })
}

//form number input function

 this.handleNumber = (event) =>{
     this.setState({
        number:event.target.value
     })
 }

  //search handle 
  this.handleSearch = (event) =>{
    this.setState({
       person:event.target.value
    })
}


 //form add button function
 this.addContact = () =>{

if(this.state.name==="" || this.state.number === ""){
  this.setState({
    alert:!this.state.alert
  })
    return
}

Axios.post('http://localhost:5000/create',{
        name:this.state.name,
        number:this.state.number
}).then(res =>{
  this.setState({
    phoneBook:res.data
  })
  this.setState({
    showForm:!this.state.showForm
  })
}).catch(err =>{
   console.log(err)
}) 
        
this.setState({
   name:"",
   number:""
})


 }
  
 // form toggle function
     this.toggleForm = ()=>{
         this.setState(
           {showForm:!this.state.showForm}
         )
     }
 
      //alert toggle
     this.toggleAlert = () =>{
        this.setState({
          alert:!this.state.alert
        })
     }

     //editing phonebook item
     this.toggleEdit = () =>{
      this.setState({
        edit:!this.state.edit
      })
   }





    //search
    this.search = () =>{
      this.setState({
        search:!this.state.search
      })
      this.setState({
        person:""
      })
   }


  //delete the phonebook list item
      this.delete = (key) =>{         
        Axios.post('http://localhost:5000/delete',{
          id:key
        }).then(res =>{
          this.setState({
            phoneBook:res.data
          })
        }).catch(err =>{
           console.log(err)
        })

      }

  //edit perosn

  this.editPerson = (id,name,number) =>{
    this.setState({
      edit:!this.state.edit
    })

     this.setState({
       editName:name,
       editNumber:number,
       id:id
     })

     
 }
    //handle edit form Number
 this.handleEditNumber = (event) =>{
  this.setState({
    editNumber:event.target.value
  })
}
//handle edit form Name
    this.handleEditName = (event) =>{
     this.setState({
     editName:event.target.value
    })
  }
   // editing contact name and number
  this.editContact = () =>{
    Axios.post('http://localhost:5000/edit',{
        id:this.state.id,
        name:this.state.editName,
        number:this.state.editNumber
    }).then(res =>{

      this.setState({
        phoneBook:res.data
      })

      this.setState({
        edit:!this.state.edit
      })



    }).catch(err =>{
       console.log(err)
    })
  }
 
  


   }

componentDidMount(){
  
   Axios.get('http://localhost:5000/read')
   .then(res =>{
     this.setState({
       phoneBook:res.data
     })
   }).catch(function(err){
      console.log('server Error!')
   })
   

 
}


  render() {
    let form=null;
    let search = null;
    let edit = null;

    //create form toggle
    if(this.state.showForm){
      form = (
        <div>
        <div className={`add_person`}  onClick={this.toggleForm} ></div>
        <div className="person">
       
          <Container className="shadow-sm w-75 person bg-light p-3 rounded">
            <Container className="d-flex justify-content-center p-2">
              <PersonCircle size="60"/>
            </Container>
            <Form>
              <FormGroup>
                <FormControl  type="text"
                onChange={this.handleName}
                value={this.state.name}
                 placeholder="Name" required={true}/>
              </FormGroup>
              <FormGroup>
                <FormControl  type="text"
                onChange={this.handleNumber}
                  value={this.state.number}
                  maxLength="10"
                 placeholder="Number" required={true}/>
              </FormGroup>
              <Button type="button"
               onClick={this.addContact}
              >Add</Button>
            </Form>
          </Container>

          
          <Alert show={this.state.alert} variant="success" >
                   <Alert.Heading>Both fields are required.</Alert.Heading>
                     <hr />
                     <div className="d-flex justify-content-end">
                       <Button
                        onClick={this.toggleAlert}
                       variant="outline-success">
                          Close
                       </Button>
                     </div>
                </Alert>

          </div>
          </div>
      )
    }

    //search toggle

      if(this.state.search){
         search = (
          <div className="search w-75">
          <FormControl
          onChange={this.handleSearch} 
          type="text "/>
        </div>
         )
      }
     
//edit toggle form

if(this.state.edit){
  form = (
    <div>
    <div className={`add_person`}  onClick={this.toggleEdit} ></div>
    <div className="person">
   
      <Container className="shadow-sm w-75 person bg-light p-3 rounded">
        <Container className="d-flex justify-content-center p-2">
          <PersonCircle size="60"/>
        </Container>
        <Form>
          <FormGroup>
            <FormControl  type="text"
            onChange={this.handleEditName}
            value={this.state.editName}
             placeholder="Name" required={true}/>
          </FormGroup>
          <FormGroup>
            <FormControl  type="text"
            onChange={this.handleEditNumber}
              value={this.state.editNumber}
              maxLength="10"
             placeholder="Number" required={true}/>
          </FormGroup>
          <Button type="button"
           onClick={this.editContact}
          >Add</Button>
        </Form>
      </Container>
  
      <Alert show={this.state.alert} variant="success" >
               <Alert.Heading>Both fields are required.</Alert.Heading>
                 <hr />
                 <div className="d-flex justify-content-end">
                   <Button
                    onClick={this.toggleAlert}
                   variant="outline-success">
                      Close
                   </Button>
                 </div>
            </Alert>

      </div>
      </div>
  )
}

    return (
      <>
         <div className="container-fluid">
            
           <Nav className="bg-dark text-light d-flex justify-content-between align-items-center nav_bar">
            <div className="d-flex justify-content-between align-items-center w-100">
              <div>
              <FilterLeft  size="35"
              onClick={this.toggleForm}
               className="float-right ml-2 pointer"/>
            </div>
            <div>
              <h1>Phone Book</h1>
            </div>
            <div>
              <Search  size="23" 
              onClick={this.search}
              className="mr-3 pointer" />
            </div>
            </div>
           {search}
           </Nav>
             {form}
             {edit}
               <Container className="pt-2">
 

                {this.state.phoneBook.filter((val) =>{
                 if(this.state.person === "")  return val
                 if(val.name.toLowerCase().includes(this.state.person.toLowerCase())) return val
                   
                }).map((contact,key)=>(
                     
                    <Container className="p-2 d-flex align-items-center" key={contact._id}>
                    <PersonCircle size="43"/>
                    <Container >
                      <p className="m-0 p-0">{contact.name}</p>
                      <p className="m-0 p-0">{contact.number}</p>
                    </Container >
                    <span onClick={() => this.editPerson(contact._id,contact.name,contact.number)}>
                      <PencilSquare size="30"  className="pointer"/>
                    </span>
                    <span className="pl-2" onClick={()=>this.delete(contact._id)}>
                      <Trash  size="30" className="pointer"/>
                    </span>
                  </Container>

                ))}
               </Container>
         </div>
      </>
    )
  }
}

