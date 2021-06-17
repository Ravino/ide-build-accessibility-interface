
Documentation for api

  Protocol:
HTTPS
  Domain:
nekrasov.pw
  Prefix path:
ide-accessibility
  Full url for example
https://nekrasov.pw/ide-accessibility/


  Path /check
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
curl -d 'html=<!DOCTYPE html><html lang="ru"><head><title>title page</title></head><body><div>text page</div></body></html>' https://nekrasov.pw/ide-accessibility/check
return data
{
  status: 'success',
  description: '',
  data: (graph accessivility stringify)
}






  Path /support
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
curl -d 'email=example.example.com&subject=My new subject appeal&body=My new body appeal' https://nekrasov.pw/ide-accessibility/support
return data
{
  status: 'success',
  description: '',
  data: null
}



