import React, { useRef, useState, useMemo, useEffect } from 'react'
import {Canvas, extend, useFrame, useThree} from '@react-three/fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { shaderMaterial } from '@react-three/drei'
import { Vector2 } from 'three';
import { BackSide } from 'three';

//what does "extend" means mathematically in this context?  
extend({OrbitControls, shaderMaterial});

  /*PRINCIPLES TO ABIDE BY:
  CLOSURE
  DESTRUCTURING OF ARRAYS,OBJ,PARAMS,ETC
  NEVER VAR, USE LET ALWAYS AND CONST OFTEN
  USE FOREACH, MAP, AND FILTER, THEY LOOK COMPOTENT
  UNDERSTAND HOW 'THIS' KEYWORD WORKS
  USE ... FOR SPREAD AND RESTING OF VARIABLES
  USE ARROW FUNCTIONS!!!
  MAKE AN APP THAT OUTLINES 3D SHAPES'S 2D FORM FOR DRAWINGS
  IMPORT  https://api.le-systeme-solaire.net/ API
  PREFER FUNCTIONS OVER CLASSES, NOT SURE WHY
  Prefer to make components 'dumb', as in, focused on displaying a value to UI
  and let custom hooks handle complex bussiness logic. don't really understand this yet so leaving here:
  https://youtu.be/b0IZo2Aho9Y?t=460
  useRef breakthrough, useref just returns an object with a single property: "current"
  const ref = useRef() essentially creates an object ref which has one property {current: undefined}, basically like
  writing "new Ref;" "ref.current = count;" ref now returns the object {current: count}
  ref.current would now equal w/e the count is
  */

//children is the child elements of composer component

// const Outliner = (props) => {
  // const {gl, scene, camera, size} = useThree();
  // const composer = useRef();
  // const aspect = useMemo( () => new Vector2( size.width, size.height ), [size] );
  // useFrame(() => composer.current.render(), 1);
//   console.log(props.children)
//   return(
    // OLD APPROACH, TRYING RENDERING BACKSIDE
    // MAY JUST HARDCODE FIRST THEN REFACTOR TO B FUNC THAT RECEIVES AN OBJ
    // <effectComposer ref = {composer} args = {[gl]}>
    //   <renderPass attachArray= "passes" args = {[scene, camera]}/>
    //   <outlinePass
    //   attachArray="passes"
    //   args={[aspect, scene, camera]}
    //   selectedObjects= {[props.children]}
    //   visibleEdgeColor = "orange"
    //   edgeStretch={50}
    //   edgeThickness={1}
    //   />
    // </effectComposer>
//   )
// }

const context = React.createContext()

const CameraControls = () => {
  //getting the camera and the renderer "gl" from the useThree() functions which returneth them and others
  const {camera, gl} = useThree();
  return (
    //this HAS to be orbitControls not OrbitControls for some reason
    //if starts with capital gives "need new invoke three.js blah blah" error
    <orbitControls args={[camera, gl.domElement]}/>
  )
}

const Outliner = props => {
  // props will be mesh = {Box} i
  const GeometryRef = useRef();
  return (
    <>
      <props.children.type />
      <mesh position = {[0, 0, 0]} scale={1.05}>
        <boxGeometry scale = {1.05} args={[1, 1, 2]} />
        <shaderMaterial depthWrite = {false} color="#f3bf10" side ={BackSide} size = "1.8"/>
      </mesh>
    </>
  )

}

function Box(props) {
  //usereft is like declaring and setting a variable in a class from its parameterx 
  //ref is now an object containing {type: value} pair: {current: undefined}
  //would this destructure props? 
  // nextline in laymans pseudocode:  State Hovered = false; func setHover(updatedState){hovered = updatedState}
  //want to refactor, such that mesh and material are arguments so that they can be reached by props.children.props
  const {geometry, material, position} = {...props}
  const [hovered, hover] = useState(false);
  //when ...spread operator used on an object, returns all individual "property: value" pairs of object 
  return (
    <mesh position = {position} scale = {1.0}>
      <geometry.type {...geometry.props}/>
      <material.type {...material.props}/>
    </mesh>
  )
}

export default function App() {
  return (
    //empty tags is react.fragment, DOM-like structure without actually modifying elements
    <div style= {{position: 'absolute', width: '100%', height: '100%'}}>
      <Canvas>
        <gridHelper args = {[20, 30]}/>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        {/* <Outliner>
          <Box geometry = {<boxGeometry/>} mesh = {<meshBasicMaterial/>} position={[0, 0, 0]} />
        </Outliner> */}
        //maybe best way to handle this is to allow ui buttons to select a shape, these results fill an object which is spread
        //across the arguments across their chosen shape
        //wait there is probably a better way to do this with children geo and material elements instead
        <Box geometry = {<boxGeometry args = {[1,1,2]}/>} material = {<meshBasicMaterial color = '#FF1493'/>} position={[0, 1, 0]} />
        <CameraControls/>
      </Canvas>
  {/* <counter/> */}
    </div>
  )
}
