import TMLogo from "../components/TMLogo";

function About() {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center">
          About ToyMarket
        </h1>
  
        <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
          <p>
            ToyMarket is a modern online store offering carefully selected new and
            pre-loved toys. Our goal is simple – to give toys a second life while
            also providing high-quality new products for families.
          </p>
  
          <p>
            We believe that toys are more than just objects. They create memories,
            spark creativity, and bring joy to both children and adults. By combining
            sustainability with quality, we aim to make toy shopping both affordable
            and responsible.
          </p>
  
          <p>
            This project was built as a full-stack web application using modern
            technologies such as React, Node.js and MongoDB. It demonstrates a
            complete e-commerce workflow including product management, shopping cart,
            checkout and order handling.
          </p>
  
          <p className="font-semibold text-blue-600">
            Thank you for visiting ToyMarket. < TMLogo /> 
          </p>
        </div>
      </div>
    );
  }
  
  export default About;