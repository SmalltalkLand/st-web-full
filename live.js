const childProcess = require('child_process')
const ws = require('ws')
const fs = require('fs')
const httpServ = require('https')
const port = 8087
// Change this if you don't have an certificate (get one for free from Let's Encrypt!)
const ssl = fs.existsSync('/etc/letsencrypt/live/st.co/fullchain.pem')
let wss;
if (ssl) {
    const ws_cfg = {
	ssl: true,
	port: port,
	ssl_key: '/etc/letsencrypt/live/st.co/privkey.pem',
	ssl_cert: '/etc/letsencrypt/live/st.co/fullchain.pem'}

    const processRequest = function(req, res) {
	console.log("Request received.")}

    var app = null

    app = httpServ.createServer(
	{
	    key: fs.readFileSync(ws_cfg.ssl_key),
	    cert: fs.readFileSync(ws_cfg.ssl_cert)
	},
	processRequest).listen(ws_cfg.port)

    wss = new ws.Server({server: app})}
else 
    wss = new ws.Server({port: port})

let instructions = new Object
global.StLive_credential = '7b495b71-ebe3-4428-942e-18827846ce6c'
let myUndefined = undefined

exports.setup = async (wrap) => {wss.on('connection', function connection(ws,req_) {
    ws.on('message', async function incoming(message) {
        let req = await wrap(req_);
	var command,
	    instruction,
	    parameters

	try {command = JSON.parse(message)}
	catch (e) {
	    myLog(ws, 'rejected malformed command' + message)
	    return}

	instruction = command.instruction
	parameters = command.parameters

	myLog(ws, 'received command \'' + instruction + '\'')

	if (command.credential == StLive_credential) {
	    switch (instruction) {
	    case 'require':
		myLog(ws, 'received require for ' + parameters.package)/*
		var loadPackage = childProcess.spawn('npm', ['install', parameters.package])
		loadPackage.on(
		    'close',
		    function () {*/
			eval(parameters.then)//})
		break
	    case 'add instruction':
		myLog(ws, 'adding instruction \'' + parameters.instructionToAdd + '\'')
		var instruction = eval('(' + parameters.body + ')')
		if (typeof instruction == 'function')
		    (instructions[req.user] || (instructions[req.user] = {}))[parameters.instructionToAdd] = instruction
		break
	    case 'eval':
		myLog(ws, 'evaluting code')
		eval(parameters.body)
		break
	    case 'modules':
		myLog(ws, 'enumerating modules')
		ws.send(JSON.stringify(Object.keys(require.cache)))
		break
	    default:
		evaluateAddedInstruction(ws, req.user, instruction, parameters)}}
	else evaluateAddedInstruction(ws, req,user, instruction, parameters)})})

function evaluateAddedInstruction(ws, user, instruction, parameters) {
    if (typeof (instructions[user] && instructions[user][instruction]) == "function") {
	myLog(ws, 'evaluating added instruction \'' + instruction + '\'')
	myLog(ws, instructions[user][instruction].apply(ws, parameters))}
    else
	myLog(ws, 'rejected command \'' + instruction + '\'')}
	      
function myLog(ws, string) {
    var toSend = 'server: ' + string
    ws.send(toSend)
    console.log(toSend)}}