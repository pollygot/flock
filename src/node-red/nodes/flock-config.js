// import axios from 'axios'
module.exports = function (RED) {
    var FlockConfig = /** @class */ (function () {
        function FlockConfig(config) {
            RED.nodes.createNode(this, config);
            var node = this;
            node.host = config.host;
            node.apiKey = config.apiKey;
        }
        return FlockConfig;
    }());
    RED.nodes.registerType('flock-config', FlockConfig);
};
