/**
 * @module Thoth
 * 
 * @description Creates simple .md formatted documentation from code comments
 * 
 * @example var documentation = new Thoth().document(string_full_of_source_code, 'Library name');
 */
var Thoth = function(options) {
  var declarationFormat = /.*(?:\/\/|\*)\s*(@(?:depends|module|description|example|option|prop|method|event).*)/;
  var dependencies = [];
  var nonModule = {options: [], props: [], methods: [], events: []};
  var modules = [];
  var currentModule = nonModule;
  
  var write2 = function(text) {
    process.stdout.write(text + '\n\n');
  }
  
  var compareByName = function(a, b) {
    return a.name > b.name ? 1 : -1;
  }
  
  var writeSections = function(module) {
    if(module.options.length > 0) {
      write2('#### Options');
      module.options.sort(compareByName);
      module.options.forEach(function(v, i, a) {
        write2('`' + v.type + '` **' + v.name + '** ' + v.description);
      });
    }
    
    if(module.props.length > 0) {
      write2('#### Properties');
      module.props.sort(compareByName);
      module.props.forEach(function(v, i, a) {
        write2('`' + v.type + '`' + (v.proto ? ' proto' : '') + ' **' + v.name + '** ' + v.description);
      });
    }
    
    if(module.methods.length > 0) {
      write2('#### Methods');
      module.methods.sort(compareByName);
      module.methods.forEach(function(v, i, a) {
        write2('`' + v.type + '`' + (v.proto ? ' proto' : '') + ' **' + v.name + '**`' + v.signature + '` ' + v.description);
      });
    }
    
    if(module.events.length > 0) {
      write2('#### Events');
      module.events.sort(compareByName);
      module.events.forEach(function(v, i, a) {
        write2('**' + v.name + '** `' + v.signature + '` ' + v.description);
      });
    }
  }
  
  var scan = function(sourceCode) {
    var sourceLines = sourceCode.split('\n');
    
    for(var i = 0, endi = sourceLines.length; i < endi; ++i) {
      if(declarationFormat.test(sourceLines[i])) {
        var line = declarationFormat.exec(sourceLines[i])[1];
        
        var declarationType = line.split(/\s/)[0];
        
        switch(declarationType) {
          case '@depends':
            var bits = /@depends\s+(\S+)(?:\s+(\S+))?/.exec(line);
            dependencies.push({name: bits[1], version: bits[2] || ''});
            break;
          case '@module':
            var bits = /@module\s*(\S*)\s*(?:inherits\s*(\S*))?/.exec(line);
            modules.push({name: bits[1], inherits: bits[2] || '', options: [], props: [], methods: [], events: []});
            currentModule = modules.slice(-1)[0];
            break;
          case '@description':
            var bits = /@description\s+(.+)/.exec(line);
            currentModule.description = (currentModule.description ? currentModule.description + '\n\n': '') + bits[1];
            break;
          case '@example':
            var bits = /@example\s+(.+)/.exec(line);
            currentModule.example = (currentModule.example ? currentModule.example + '\n': '') + bits[1];
            break;
          case '@option':
            var bits = /@option\s+(\S+)\s+(\S+)(?:\s+(.+))?/.exec(line);
            currentModule.options.push({type: bits[1], name: bits[2], description: bits[3] || ''});
            break;
          case '@prop':
            var bits = /@prop(\s+proto)?\s+(\S+)\s+(\S+)(?:\s+(.+))?/.exec(line);
            currentModule.props.push({proto: Boolean(bits[1]), type: bits[2], name: bits[3], description: bits[4] || ''});
            break;
          case '@method':
            var bits = /@method(\s+proto)?\s+(\S+)\s+(\S+)(\([^\(\)]*\))(?:\s+(.+))?/.exec(line);
            currentModule.methods.push({proto: Boolean(bits[1]), type: bits[2], name: bits[3], signature: bits[4], description: bits[5] || ''});
            break;
          case '@event':
            var bits = /@event\s+(\S+)\s+(\{.*\})(?:\s+(.+))?/.exec(line);
            currentModule.events.push({name: bits[1], signature: bits[2], description: bits[3]});
            break;
        }
      }
    }
  }
  
  // @method String document(String sourceCode[, String name]) -- Accepts source code and makes docs
  this.document = function(sourceCode, name) {
    scan(sourceCode);
    
    write2('# ' + name);
    
    if(nonModule.description) {
      write2(nonModule.description);
    }
    
    var dependencyString = 'Dependencies: ';
    
    if(dependencies.length === 0) {
      dependencyString += 'None';
    } else {
      dependencies.forEach(function(v, i, a) {
        dependencyString += ', `' + v.name + '` ' + v.version;
      });
      dependencyString = dependencyString.replace('Dependencies: , ', 'Dependencies: ');
    }
    
    write2(dependencyString);
    
    writeSections(nonModule);
    
    modules.forEach(function(v, i, a) {
      write2('---');
      write2('## ' + v.name);
      write2('Inherits: ' + (v.inherits ? '`' + v.inherits + '`' : 'None'));
      
      if(v.description) {
        write2(v.description);
      }
      
      if(v.example) {
        write2('```\n' + v.example + '\n```');
      }
      
      writeSections(v);
    });
  }
}

if(module && module.exports) {
  module.exports = Thoth;
}