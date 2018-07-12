( function () {
    const form = document.querySelector('.form'),
        fname = form.querySelector('.firstName'),
        lname = form.querySelector('.lastName'),
        country = form.querySelector('.country'),
        password = form.querySelector('.password'),
        passwordConfirmation = form.querySelector('.passwordConfirmation'),
        email = form.querySelector('.email'),
        note = form.querySelector('.note'),
        fields = form.querySelectorAll('.field');

    const errorGenerator = function (text) {
        const error = document.createElement('div');
        error.className = 'error';
        error.style.color = 'red';
        error.innerHTML = text;
        return error;
    }
    const removeErrorMessage = function () {
        const errors = form.querySelectorAll('.error');
        for(let i = 0; i < errors.length; i++) {
            errors[i].remove();
            form[i].style.borderColor= 'green';

        }
    }

    const checkFields = function () {
        for(let i = 0; i < fields.length; i++) {
            if(!fields[i].value) {
                const error = errorGenerator('Can not be empty!');
                form[i].style.borderColor = 'red';
                form[i].parentElement.insertBefore(error, fields[i]);
            }
        }
    }

    const checkPasswordMatch = function () {
        if(password.value !== passwordConfirmation.value) {
            const error = errorGenerator('Password does not match!');
            password.style.borderColor = 'red';
            passwordConfirmation.style.borderColor = 'red';
            password.parentElement.insertBefore(error,password);
            password.focus();
        }

    }

    const checkEmail = function () {
        let regExp = "([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$";
        if(!email.value.match(regExp)) {
            const error = errorGenerator('E-mail does not correct! E-mail should contains @');
            email.style.borderColor = 'red';
            email.parentElement.insertBefore(error,email);
            email.focus();
        }
        if (email.value === "") {
            removeErrorMessage();
            checkFields();
        }
    }

    const checkTextField = function (textInput) {
        if(textInput.value.match(/"/i) || textInput.value.match(/'/i)) {
            let error = errorGenerator('Contains \" \' symbol(s)');
            textInput.style.borderColor = 'red';
            textInput.parentElement.insertBefore(error, textInput);
            textInput.focus();
        }
    }

    const checkSizeText = function(text) {
        if(text.value.length  > 1) {
            checkTextField(text);

        } else  if (text.value.length  > 0 && text.value.length  < 3) {
            let error = errorGenerator('Text should has more than 2 charts');
            text.style.borderColor = 'red';
            text.parentElement.insertBefore(error, text);
            text.focus();
        }
    }

    const checkFName = function() {
        checkSizeText(fname);
    }
    const checkLName = function() {
        checkSizeText(lname);
    }
    const checkNote = function() {
        checkTextField(note);
    }

    const validate = function (event){
        const errors = form.querySelectorAll('.error');
        if(errors.length > 0){
            // event.preventDefault();
            console.log('You have errors')
        } else {
            document.querySelector('.modal').style.display = 'block';
        }
    }



    form.addEventListener('submit', function (event) {
        event.preventDefault();
        removeErrorMessage();
        checkFields();
        checkPasswordMatch();
        checkEmail();
        checkFName();
        checkLName();
        checkNote();
        validate();


    })

})()
