class Form
{
 constructor(formSelector, fields) {
     this.formSelector = formSelector;
     this.fieldSet = fields;
     this.validator = new Validator(this);
 }

 fieldSetValidate() {
     this.fieldSet.forEach(function (field) {
         field.validate();
     });
 }
}

class Field
{
    constructor(type, selector) {
        this.type = type;
        this.selector = selector;
        this.validator = new Validator(this);
        this.validateSet = [this.checkEmpty];
    }

    checkEmpty(context) {
        let domElement = document.querySelector(context.selector);
        if(!domElement.value) {
            context.validator.generateError('Can not be empty!');
        }
    }

    validate() {
        let self = this;
        this.validateSet.forEach(function (validateMethod) {
            validateMethod(self);
        })
    }
}

class TextField extends Field
{
    constructor(type, selector) {
        super(type, selector);
        this.validateSet.push(this.textValidate);
    }

    textValidate(context)
    {
        let domElement = document.querySelector(context.selector);
        if(domElement.value.match(/"/i) || domElement.value.match(/'/i)) {
            context.validator.generateError('Contains \" \' symbol(s)');
        }

        if(domElement.value.length  > 0 && domElement.value.length  < 3) {
            context.validator.generateError('Text should has more than 2 charts');
        }
    }
}

class PassField extends Field
{
    constructor(type, selector, passwordConfirmation) {
        super(type, selector);
        this.passwordConfirmation = passwordConfirmation;
        this.validateSet.push(this.passwordValidate);
    }

    passwordValidate(context)
    {
        let domElement = document.querySelector(context.selector);
        let conf = document.querySelector(context.passwordConfirmation.selector);
        if(domElement.value !== conf.value) {
            context.validator.generateError('Password does not match!');
        }
    }
}

class EmailField extends Field
{
    constructor(type, selector) {
        super(type, selector);
        this.validateSet.push(this.emailValidate);
    }

    emailValidate(context)
    {
        let domElement = document.querySelector(context.selector);
        let regExp = "([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$";
        if(!domElement.value.match(regExp)) {
            context.validator.generateError('E-mail does not correct! E-mail should contains @');
        }
    }
}

class ErrorGenerator
{
    constructor() {
        this.errorContainer = document.createElement('div');
        console.log(this.errorContainer);
    }
    generate(errorText) {
        this.errorContainer.className = 'error';
        this.errorContainer.style.color = 'red';
        this.errorContainer.innerHTML = errorText;
        return this;
    }

    getError()
    {
        return this.errorContainer;
    }
}

class Validator
{
    constructor(element) {
        this.element = element;
        this.errorGenerator = new ErrorGenerator();
    }

    generateError(text) {
        let error = this.errorGenerator.generate(text).getError();
        let domElement = document.querySelector(this.element.selector);
        domElement.parentElement.insertBefore(error, domElement);
        domElement.style.borderColor = 'red';
        domElement.focus();
    }

    removeErrorStyles() {
        const errors = document.querySelectorAll('.error');
        if (errors.length) {
            errors.forEach(function (error) {
                error.nextSibling.style.borderColor = 'green';
                error.remove();
            });
        }
    }
}

class Submit
{
    constructor(form, selector) {
        this.form = form;
        this.selector = selector;
    }

    init() {
        let self = this;
        let formElement =  document.querySelector('#form');

        formElement.addEventListener('submit', function (event) {
            event.preventDefault();
            self.form.validator.removeErrorStyles();
            self.form.fieldSetValidate();
            if(formElement.querySelectorAll('.error').length <= 0) {
                document.querySelector('.modal').style.display = 'block';
            }
        })
    }
}

const passConfirmField = new Field('passwordConfirmation', '.passwordConfirmation');
const fields = [
    new TextField('fname', '.firstName'),
    new TextField('lname', '.lastName'),
    new TextField('birthday', '.birthday'),
    new TextField('country', '.country'),
    new TextField('address', '.address'),
    passConfirmField,
    new PassField('password', '.password', passConfirmField),
    new EmailField('email', '.email'),
    new TextField('note', '.note'),
];

const form = new Form('.form', fields);
const submit = new Submit(form);
submit.init();