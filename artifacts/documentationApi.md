
Documentation for api

  Protocol:
HTTPS
  Domain:
nekrasov.pw
  Prefix path:
ide-accessibility
  Full url for example
https://nekrasov.pw/ide-accessibility/


  Path /gateway/check
input data:
  field: html
type: string
necessarily: yes

Output data:
{
  status: string,
  description: string (options),
  data: null (options)
}


variants of status:
success: request processed successfully
notSuccess: request processed not successfully
invalidSyntax: syntax of html string invalid

for example request curl:
curl -d 'html=<!DOCTYPE html><html lang="ru"><head><title>title page</title></head><body><div>text page</div></body></html>' https://nekrasov.pw/ide-accessibility/api/gateway/check
return data
{
  status: 'success',
  description: '',
  data: (graph accessivility stringify)
}






  Path /gateway/support
input data:
  field: email
type: string
necessarily: yes

field: subject
type: string
necessarily: yes

field: body
type: string
necessarily: yes


Output data:
{
  status: string,
  description: string (options),
  data: null (options)
}


variants of status:
success: request processed successfully
notSuccess: request processed not successfully
invalidEmail: Email address invalid
invalidAppeal: subject or body of appeal is invalid


for example request curl:
curl -d 'email=example.example.com&subject=My new subject appeal&body=My new body appeal' https://nekrasov.pw/ide-accessibility/api/gateway/support
return data
{
  status: 'success',
  description: '',
  data: null
}




  Path /registration-authorization/signin/email
input data:
  field: email
type: string
necessarily: yes


// comment: field  with name method = registration or authentication
  field: method
type: string
necessarily: yes


//comment: field with name firstname using only by field method = registration
field: firstname
type: string
necessarily: yes

//comment: field with name lastname using only by field method = registration
field: lastname
type: string
necessarily: yes


//comment: field with name username using only by field method = authentication
field: username
type: string
necessarily: yes


//comment: field with name password using only by field method = authentication
field: password
type: string
necessarily: yes


Output data:
{
  status: string,
  description: string (options),
  data: null (options)
}


variants of status:
success: request processed successfully
notSuccess: request processed not successfully
invalidEmail: Email address invalid
invalidFirstname:  firstname of form reg is invalid
invalidLastname:  lastname of form reg is invalid



for example request curl:
curl -d 'method=registration&email=example@example.com&firstname=Example&lastname=Example' https://nekrasov.pw/ide-accessibility/api/registration-authorization/signin/email

curl -d 'method=authentication&username=example@example.com&password=example' https://nekrasov.pw/ide-accessibility/api/registration-authorization/signin/email

return data
{
  status: 'success',
  description: '',
  data: null
}




  Path /registration-authorization/recovery/password
input data:
  field: email
type: string
necessarily: yes

Output data:
{
  status: string,
  description: string (options),
  data: null (options)
}


variants of status:
success: request processed successfully
notSuccess: request processed not successfully
invalidSyntax: syntax of html string invalid

for example request curl:
curl -d 'email=test@test.test' https://nekrasov.pw/ide-accessibility/api/registration-authorization/recovery/password
