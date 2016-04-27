console.log('starting password manager');

var crypto = require('crypto-js');
var storage = require('node-persist');

storage.initSync(); 

var argv = require('yargs')
	.command('create','Helps in creating an account',function(yargs){
		yargs.options({
			name : {
				demand : true,
				alias : 'n',
				description : 'Account name (e.g. twitter, facebook)',
				type : 'string'
			},
			username : {
				demand : true,
				alias : 'u',
				description : 'account username or email',
				type : 'string'
			},
			password : {
				demand : true,
				alias : 'p',
				description :'Account password goes here',
				type : 'string'
			},
			masterPassword :{
				demand : true,
				alias : 'm',
				description : 'Master password goes here',
				type: 'string'
			}

		}).help('help');
	})
	.command('get','Helps in getting an account',function(yargs){
		yargs.options({
			name : {
				demand : true,
				alias : 'n',
				description :'enter Account name for results',
				type : 'string' 
			},
			masterPassword : {
				demand : true,
				alias : 'm',
				description : 'Master Password should be given to etch account',
				type : 'string'
			}
		}).help('help');
	})
	.help('help')
	.argv;

var command = argv._[0];

function getAccounts (masterPassword){

	var encryptedAccounts = storage.getItemSync(accounts);
	var accounts =[];

	if(typeof encryptedAccounts !== 'undefined') {
		var bytes = crypto.AES.decrypt(encryptedAccounts,masterPassword);

		var accounts = JSON.parse(bytes.toString(crypto.enc.Utf8)); 
	}
	

	return accounts;
}

function saveAccounts (accounts, masterPassword){

	var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts)	,masterPassword);

	storage.setItemSync('accounts',encryptedAccounts.toString());

	return accounts;

}

function createAccount (account,masterPassword){

	var accounts = getAccounts(masterPassword);


	accounts.push(account);



	saveAccounts(accounts,masterPassword);
	return account;


}

function getAccount (accountName,masterPassword){

	var accounts = getAccounts(masterPassword);

	var matchedAccount;


	accounts.forEach(function (account) {
		if (account.name === accountName) {
			matchedAccount = account;
		}
	});

	return matchedAccount;


}



if(command === 'create'){
	var createdAccount = createAccount({
		name : argv.name,
		username : argv.username,
		password : argv.password,
	}, argv.masterPassword);
	console.log('Account created successfully');
	console.log(createdAccount);
	console.log('Account added into the database');
	console.log('Use get command along with the account name to fetch the data');
}
else if(command === 'get'){
	var fetchedAccount = getAccount(argv.name, argv.masterPassword);

	if(typeof fetchedAccount === 'undefined'){
	console.log('Account not found');
	}
	else {
		console.log('Account found');
		console.log(fetchedAccount);
	}

}
else console.log('invalid command');
