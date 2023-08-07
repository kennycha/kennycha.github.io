import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import vertexShader from "./shaders/vertex.glsl?raw";
import fragmentShader from "./shaders/fragment.glsl?raw";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { HEADER_HEIGHT } from "../../constants";

const cx = classNames.bind(styles);

const NoiseCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.children.length !== 0) return;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
    });
    container.appendChild(renderer.domElement);

    const composer = new EffectComposer(renderer);
    composer.setSize(window.innerWidth, window.innerHeight - HEADER_HEIGHT);
    renderer.setSize(window.innerWidth, window.innerHeight - HEADER_HEIGHT);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0000ff);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight - HEADER_HEIGHT), 0.1, 100);
    camera.position.set(0, 0, 10);

    const textureLoader = new THREE.TextureLoader().setPath("assets/textures/");
    const texture = textureLoader.load("texture0.jpg");
    const geometry = new THREE.PlaneGeometry(48, 48, 16, 16);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });
    const plate = new THREE.Mesh(geometry, material);

    scene.add(plate);

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const customShader = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: {
          value: null,
        },
        uTime: {
          value: 0,
        },
      },
      vertexShader,
      fragmentShader,
    });
    const shaderPass = new ShaderPass(customShader);
    composer.addPass(shaderPass);

    const draw = () => {
      composer.render();

      requestAnimationFrame(draw);
    };

    draw();

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / (window.innerHeight - HEADER_HEIGHT);
      camera.updateProjectionMatrix();

      composer.setSize(window.innerWidth, window.innerHeight - HEADER_HEIGHT);
      renderer.setSize(window.innerWidth, window.innerHeight - HEADER_HEIGHT);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.onresize = onWindowResize;
  }, []);

  return <div ref={containerRef} className={cx("container")}></div>;
};

export default NoiseCanvas;
