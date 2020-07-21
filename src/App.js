import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import * as firebase from 'firebase';
import 'firebase/firestore';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true
    }

    this.db=firebase.firestore();

    //this.increaseQuantity=this.increaseQuantity.bind(this);
  }

  componentDidMount(){
    // console.log(firebase);
    // firebase
    // .firestore()
    // .collection('products')
    // .get()
    // .then((snapshot)=>{
    //   console.log('snapshot');
    //   console.log(snapshot);
    //   snapshot.docs.map((doc)=>{
    //     console.log(doc.data);
    //   });
      
    //   const products=snapshot.docs.map((doc)=>{
    //     console.log(doc.data());
    //     const data= doc.data();
    //     data['id']=doc.id;
    //     return data;
    //   });

    //   this.setState({
    //     products
    //   })
    // })
    this.db
    .collection('products')
    .onSnapshot((snapshot)=>{
      console.log('snapshot');
      console.log(snapshot);
      snapshot.docs.map((doc)=>{
        console.log(doc.data);
      });
      
      const products=snapshot.docs.map((doc)=>{
        console.log(doc.data());
        const data= doc.data();
        data['id']=doc.id;
        return data;
      });

      this.setState({
        products,loading:false
      })
    })
  }

  handleIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    // products[index].qty += 1;

    // this.setState({
    //   products
    // })

    const docRef=this.db.collection('products').doc(products[index].id);
    docRef
    .update({
      qty: products[index].qty+1
    })
    .then(()=>{
      console.log('updated successfully');
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    if (products[index].qty > 0){
      const docRef=this.db.collection('products').doc(products[index].id);
    docRef
    .update({
      qty: products[index].qty-1
    })
    .then(()=>{
      console.log('updated successfully');
    })
    .catch((err)=>{
      console.log(err);
    })
    }
      // products[index].qty -= 1;

    // this.setState({
    //   products
    // })
  }

  handleDeleteQuantity = (id) => {
    const { products } = this.state;
    // const items = products.filter((item) => item.id !== id);
    // this.setState({
    //   products: items
    // })

    const docRef=this.db.collection('products').doc(id);

    docRef
    .delete()
    .then(()=>{
      console.log('Deleted successfully');
    })
    .catch((err)=>{
      console.log(err);
    })

  }

  getCartCount=()=>{
    const{products}=this.state;
    let count=0;

    products.forEach((product)=>{
      count+=product.qty;
    });

    return count;
  }

  getCartTotal=()=>{
    const {products}=this.state;

    let cartTotal=0;

    products.map((product)=>{
      cartTotal+=product.qty*product.price;
    })

    return cartTotal;
  }

  addProduct=()=>{
    this.db
      .collection('products')
      .add({
        img: '',
        price: 900,
        qty: 3,
        title: 'Mobile'
      })
      .then((docRef)=>{
        console.log('Product has been added',docRef)
      })
      .catch((error)=>{
        console.log('Error:',error);
      })
  }

  render() {
    const{products, loading}=this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()}/>
        {/* <button onClick={this.addProduct} style={{padding: 20, fontSize: 20}}> Add a Product</button> */}
        <Cart 
        products={products}
        onIncreaseQuantity={this.handleIncreaseQuantity} 
        onDecreaseQuantity={this.handleDecreaseQuantity}
        onDeleteQuantity={this.handleDeleteQuantity}
        />
        {loading && <h1>Loading Products...</h1> }
        <div>Total: {this.getCartTotal()}</div>
      </div>
    );
  }
}

export default App;
