    let palabraSecretaContainer = document.getElementById("palabraSecretaContainer")     
    let boton = document.getElementById("boton")
    let letrasErroneas = document.getElementById("letrasErroneas")
    let botonPersonalizar = document.getElementById("botonPersonalizar")
    let palabraSecreta = ""
    let palabraFinal = ""
    
    
    function palabraSecretaPersonalizada(){
        palabraSecreta = prompt("Introduce la palabra a adivinar: ").toLowerCase() 
        for(let i=0; i<palabraSecreta.length; i++){
            palabraFinal = palabraSecreta
            let div = document.createElement("div")
            div.setAttribute("class", "divLetra")
            palabraSecretaContainer.appendChild(div)
        }       
    }    
    botonPersonalizar.addEventListener("click", palabraSecretaPersonalizada)
    const empezarElJuego = () => {
        boton.disabled = true
        botonPersonalizar.disabled = true
        if(palabraSecreta===""){
            let palabras = ["HTML", "CSS", "JavaScript", "React", "MongoDb"]
            palabraSecreta = palabras[Math.floor(Math.random()*4)].toLowerCase()
            palabraFinal=palabraSecreta
            for(let i=0; i<palabraSecreta.length; i++){
                let div = document.createElement("div")
                div.setAttribute("class", "divLetra")
                palabraSecretaContainer.appendChild(div)
            }
            
        }

        alert("Empieza a presionar las teclas para adivinar la palabra secreta")

        let intentos = 1              
        let arrayLetrasErroneas = new Set()
        let pantalla = document.querySelector("canvas");
        let pincel = pantalla.getContext("2d");
        let limite = 0
        pincel.fillStyle = "white"
        pincel.fillRect(50,50,400,400)
        pincel.lineWidth = 7
        pincel.strokeStyle = 'orange'
        document.addEventListener("keydown", e => {
            let letraIntroducida = e.keyCode >= 65 && e.keyCode <= 90 ? e.key : alert("Tecla erronea, debes presionar una letra")  
            
            
            if(!palabraSecreta.includes(letraIntroducida.toLowerCase())){
                if(!arrayLetrasErroneas.has(letraIntroducida.toLowerCase())){
                    arrayLetrasErroneas.add(letraIntroducida)
                    
                    letrasErroneas.innerHTML = [...arrayLetrasErroneas].join(", ").toUpperCase()
                    switch (intentos){
                        case 1:
                            pincel.beginPath();
                            pincel.moveTo(100,350);
                            pincel.lineTo(100,100);
                            pincel.lineTo(200,100);
                            pincel.moveTo(200,100);
                            pincel.lineTo(200,120);	
                            pincel.stroke();
                        break;
                        case 2:    
                            pincel.beginPath()
                            pincel.moveTo(225,145)
                            pincel.arc(200,145,25,0,2*3.14);
                            pincel.stroke()
                        break;
                        case 3:
                            pincel.beginPath()
                            pincel.moveTo(200,170)
                            pincel.lineTo(200,250)
                            pincel.stroke()
                        break;
                        case 4:
                            pincel.beginPath()
                            pincel.moveTo(200,185)
                            pincel.lineTo(175,210)
                            pincel.stroke()
                        break;
                        case 5:
                            pincel.beginPath()
                            pincel.moveTo(200,185)
                            pincel.lineTo(225,210)
                            pincel.stroke()
                        break;
                        case 6:
                            pincel.beginPath()
                            pincel.moveTo(200,248)
                            pincel.lineTo(172,275)
                            pincel.stroke()
                        break;
                        case 7:
                            pincel.beginPath()
                            pincel.moveTo(200,248)
                            pincel.lineTo(225,275)
                            pincel.stroke()
                            alert("Se acabaron tus intentos, la palabra secreta era " + "'" + palabraFinal.toUpperCase() + "'")
                            
                            location.reload()    
                        break;                       
                    }
                    intentos++                    
                } 
                
            }else{                
                let index = palabraSecreta.indexOf(letraIntroducida)                
                let parentDiv = document.getElementById("palabraSecretaContainer")
                let div = document.querySelector(`article :nth-child(${index+1})`)
                let newDiv = document.createElement("div")
                newDiv.setAttribute("class", "divLetra")
                newDiv.textContent = letraIntroducida.toUpperCase();
                parentDiv.replaceChild(newDiv, div);
                palabraSecreta = palabraSecreta.split("")
                palabraSecreta[index]="*"
                palabraSecreta=[...palabraSecreta].join("")
                limite++
                    if(limite === palabraSecreta.length ){
                        let felicitacion = document.createElement("h1")
                        felicitacion.innerText = "Felicidades adivinaste la palabra"
                        let header = document.querySelector("header")
                        header.append(felicitacion)
                        setTimeout(()=>location.reload(), 2000)                        
                    }
            }    
        })
    
    }

boton.addEventListener("click", empezarElJuego);