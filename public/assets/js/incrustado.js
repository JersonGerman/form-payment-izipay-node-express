const header = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: 90,
      currency: "USD",
      customer: {
        email: "example9@gmail.com",
      },
      orderId: "pedido-9",
    }),
};
var body = {};

document.getElementById("abrir-formulario").addEventListener("click", () => {
    Swal.fire({
        titleText: "Formulario de Izipay",
        html: `
            <div class="mb-3 text-start px-4">
                <label for="name" class="form-label">Nombres</label>
                <input type="text" class="form-control" id="name" placeholder="Nombres">
            </div>
            <div class="mb-3 text-start px-4">
                <label for="lastName" class="form-label">Apellidos</label>
                <input type="text" class="form-control" id="lastName" placeholder="Apellidos">
            </div>
            <div class="mb-3 text-start px-4">
                <label for="email" class="form-label">Email</label>
                <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">@</span>
                    <input type="email" class="form-control" id="email" placeholder="Email">
                </div>
            </div>
            <div class="mb-3 text-start px-4">
                <label for="amount" class="form-label">Monto</label>
                <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">$</span>
                    <input type="text" class="form-control" id="amount" placeholder="Ingrese un monto">
                </div>
            </div>
        `,
        confirmButtonText:"Regitrar",
        allowOutsideClick: () => {
            const popup = Swal.getPopup()
            popup.classList.remove('swal2-show')
            setTimeout(() => {
              popup.classList.add('animate__animated', 'animate__headShake')
            })
            setTimeout(() => {
              popup.classList.remove('animate__animated', 'animate__headShake')
            }, 500)
            return false
        },
        // showClass: {
        //     popup: 'animate__animated animate__fadeInDown'
        // },
        // hideClass: {
        //     popup: 'animate__animated animate__fadeOutUp',
        // },
        allowEscapeKey: false,
        allowEnterKey: false,
        showCloseButton: true,
        showLoaderOnConfirm: true,
        preConfirm: () => {
            const { name, lastName, email, amount} = getValuesInputId("name","lastName","email","amount");

            if ( lastName.trim() === "" || name.trim() === "") return Swal.showValidationMessage(`Nombres y Apellidos no pueden ser nulos`);
            if ( !/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(email)) return Swal.showValidationMessage("Email inválido");
            if ( isNaN(amount) || amount.trim() === "" || amount < 1) return Swal.showValidationMessage(`Monto mínimo $/1.00`);

            body = {
                name: name.trim(),
                lastName: lastName.trim(),
                amount: amount.trim(),
                email: email.trim()
            }
            const request = {
                method:"POST", 
                headers:{   "Content-Type": "application/json"}, 
                body: JSON.stringify(body)
            };
            return fetch("http://localhost:3000/api/createPayment", request)
                .then(res=>{
                    // console.log(res);
                    if (!res.ok) return Swal.showValidationMessage("Hubo un error");
                    return res.json();
                })
                .catch(err => {
                    Swal.showValidationMessage(`Hubo un error.`);
                    // console.log("Catch: ", err);
                    return false;
                });
        }
    }).then(({isConfirmed, value}) => {
        if ( isConfirmed ) {
            Swal.fire({
                titleText: 'Izipay',
                html: `<br>
                    <div class="mb-3 text-start px-4">
                        <input class="form-control" type="text" id="changedAmount" placeholder="Ingrese un nuevo monto">
                    </div>
                    <button id="button-changeFormToken" class="btn btn-info">Cambiar FormToken</button>
                    <br><br>
                    <div id="spinner">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    <div id="form-izipay" >
                        <div class="kr-smart-form m-auto"></div>
                    </div>
                `,
                didRender: () => {
                    document.querySelector("#spinner").style.display = "none";
                    eventChangeFormToken();
                    KR.setFormConfig({
                        // Establecer token de formulario
                        formToken: value.formToken,
                        // "kr-popin":true,
                        // "kr-spa-mode": true
                    })
                    .then(({KR}) => KR.onSubmit(validatePayment))
                    .then(({KR}) => KR.attachForm("#form-izipay"))
                    .then(({KR,result}) => KR.showForm(result.formId))
                    .then(({KR}) => KR.button.setLabel('PAGAR %amount-and-currency% '))
                    .then(({KR}) => KR.button.onClick(()=>{
                            console.log("No se cumple requisitos de pago");
                            return true;
                    }))
                },
                willClose: () => {
                    window.location.reload()
                },
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                showCloseButton: true,
                showConfirmButton: false
            })
        }
    }) 
    // fetch("http://localhost:3000/api/createPayment", header)
    // .then((res) => res.json())
    // .then( (res) => {

    //         console.log(res);

    //         KR.setFormConfig({
    //             formTolen: res.formToken
    //         })
    //         .then(({KR}) => KR.onSubmit(validatePayment))
    //         .then(({KR}) => KR.addForm("#form-izipay"))
    //         .then(({KR, result}) => KR.showForm(result.formId)) 
    //         .then(({KR}) => KR.button.setLabel('PAGAR %amount-and-currency% '))
    // })
    // .catch(err => console.log(err));
    
    
});


    
const validatePayment = (event) => {
    console.log("pago:", event)
    fetch("http://localhost:3000/api/validatePayment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
    })
    .then((res) => res.json())
    .then((res) => {
        if (res == "Valid Payment") {
        // document.getElementById("paymentForm").innerHTML =
        //     "<h1>Successful Payment</h2>";
        alert("Pago exitoso")
        }
    });
};

const getValuesInputId = (...args) => {
    const newObjetc= {};
    for(let arg of args) {
        let element = document.getElementById(arg).value;
        newObjetc[arg] = element;
    }
    return newObjetc;
};

// document.getElementById("button-spinner").addEventListener("click", () => {
//     KR.button.hideSpinner();
// });
// document.getElementById("button-show").addEventListener("click", () => {
//     KR.button.showSpinner();
// });

const eventChangeFormToken = () =>{
    document.getElementById("button-changeFormToken").addEventListener("click", () => {
        KR.removeForms();
        const {changedAmount} = getValuesInputId("changedAmount");
        body.amount = changedAmount;
        const request = {
            method:"POST", 
            headers:{   "Content-Type": "application/json"}, 
            body: JSON.stringify(body)
        };
        fetch("http://localhost:3000/api/createPayment", request)
        .then(res=>{
            // console.log(res);
            if (!res.ok) return Swal.showValidationMessage("Hubo un error");
            return res.json();
        })
        .then(({formToken})=>{
            KR.setFormConfig({formToken})
            .then(({KR}) => KR.attachForm("#form-izipay"))
            .then(({KR,result}) => KR.showForm(result.formId))
        })
        .catch(err => {
            Swal.showValidationMessage(`Hubo un error.`);
            // console.log("Catch: ", err);
            return false;
            });
        
    })
}

  
    