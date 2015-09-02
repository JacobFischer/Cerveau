var Class = require("./utilities/class");
var Client = require("./client");
var GameLogger = require("./gameLogger");

var constants = require("./constants");
var serializer = require("./utilities/serializer");

/**
 * @class Server: a base class that handles clients
 */
var Server = Class({
    init: function(options) {
        this.clients = [];

        this.noTimeout = Boolean(options.noTimeout);
        this.printIO = Boolean(options.printIO);
        this.name = options.name || "Server";
    },

    /**
     * listener function that creates a new Client for the given socket being added
     *
     * @param {net.Socket} socket connecting
     * @param {Object} data about the connecting client
     * @returns {Client} newly created client for the passed in socket
     */
    addSocket: function(socket, clientInfo) {
        console.log(this.name + ": received new connection!");
        var client = new Client(socket, this, clientInfo);
        this.clients.push(client);

        return client;
    },

    /**
     * When the client sends data via socket connection, invoked by Clients.
     *
     * @param {Client} client that sent the data. This SHOULD be an event to be handled by the inheriting Server Class
     * @param {object} data sent from client
     */
    clientSentData: function(client, data) {
        if(data.event) {
            var callback = this['_clientSent' + data.event.upcaseFirst()]; // should be in the inherited class

            if(callback) {
                callback.call(this, client, data.data);
            }
            else {
                console.error(this.name = ": Error - no callback for:", data.event);
            }
        }
        else {
            console.error(this.name + " Error - client '" + client.name + "' sent data with no event.");
            client.send("invalid", "did not send event");
        }
    },

    /**
     * Called from a Client when it's socket disconnects
     * 
     * @param {Client} the client that disconnected.
     * @param {string} human readable string why it disconnected
     * @returns {Client} the same client that disconnected
     */
    clientDisconnected: function(client, reason) {
        console.log(this.name + ": Client " + client.name + " disconnected");

        this.clients.removeElement(client);

        return client;
    },

    /**
     * Called from a client when it times out
     *
     * @param {Client} client that timed out
     * @param {string} human readable string why the client timed out (probably just contains how long it waited before timing out).
     */
    clientTimedOut: function(client, reason) {
        console.log(this.name + ": Client " + client.name + " timed out");

        this.clientDisconnected(client, reason);
    },
});

module.exports = Server;
