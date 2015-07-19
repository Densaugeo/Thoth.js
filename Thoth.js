/**
 * @module Thoth
 * 
 * @description Creates simple .md formatted documentation from code comments
 * 
 * @example var documentation = new Thoth().document(string_full_of_source_code, 'Library name');
 */
var Thoth = function() {
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
      module.options.forEach(function(v) {
        write2('`' + v.type + '` **' + v.name + '** ' + v.description);
      });
    }
    
    if(module.props.length > 0) {
      write2('#### Properties');
      module.props.sort(compareByName);
      module.props.forEach(function(v) {
        write2('`' + v.type + '`' + (v.proto ? ' proto' : '') + ' **' + v.name + '** ' + v.description);
      });
    }
    
    if(module.methods.length > 0) {
      write2('#### Methods');
      module.methods.sort(compareByName);
      module.methods.forEach(function(v) {
        write2('`' + v.type + '`' + (v.proto ? ' proto' : '') + ' **' + v.name + '**`' + v.signature + '` ' + v.description);
      });
    }
    
    if(module.events.length > 0) {
      write2('#### Events');
      module.events.sort(compareByName);
      module.events.forEach(function(v) {
        write2('**' + v.name + '** `' + v.signature + '` ' + v.description);
      });
    }
  }
  
  var scan = function(sourceCode) {
    var sourceLines = sourceCode.split('\n');
    
    for(var i = 0, endi = sourceLines.length; i < endi; ++i) {
      if(declarationFormat.test(sourceLines[i])) {
        var line = declarationFormat.exec(sourceLines[i])[1];
        
        try {
          var declarationType = line.split(/\s/)[0];
          
          var bits = [];
          
          switch(declarationType) {
            case '@depends':
              bits = /@depends\s+(\S+)(?:\s+(\S+))?/.exec(line);
              dependencies.push({name: bits[1], version: bits[2] || ''});
              break;
            case '@module':
              bits = /@module\s*(\S*)\s*(?:inherits\s*(\S*))?/.exec(line);
              modules.push({name: bits[1], inherits: bits[2] || '', options: [], props: [], methods: [], events: []});
              currentModule = modules.slice(-1)[0];
              break;
            case '@description':
              bits = /@description\s+(.+)/.exec(line);
              currentModule.description = (currentModule.description ? currentModule.description + '\n\n': '') + bits[1];
              break;
            case '@example':
              bits = /@example\s?(.*)/.exec(line);
              currentModule.example = (currentModule.example ? currentModule.example + '\n': '') + bits[1];
              break;
            case '@option':
              bits = /@option\s+(\S+)\s+(\S+)(?:\s+(.+))?/.exec(line);
              currentModule.options.push({type: bits[1], name: bits[2], description: bits[3] || ''});
              break;
            case '@prop':
              bits = /@prop(\s+proto)?\s+(\S+)\s+(\S+)(?:\s+(.+))?/.exec(line);
              currentModule.props.push({proto: Boolean(bits[1]), type: bits[2], name: bits[3], description: bits[4] || ''});
              break;
            case '@method':
              bits = /@method(\s+proto)?\s+(\S+)\s+(\S+)(\([^\(\)]*\))(?:\s+(.+))?/.exec(line);
              currentModule.methods.push({proto: Boolean(bits[1]), type: bits[2], name: bits[3], signature: bits[4], description: bits[5] || ''});
              break;
            case '@event':
              bits = /@event\s+(\S+)\s+(\{.*\})(?:\s+(.+))?/.exec(line);
              currentModule.events.push({name: bits[1], signature: bits[2], description: bits[3]});
              break;
          }
        } catch(e) {
          console.error('Error parsing line ' + (i + 1) + ': "' + line + '"');
        }
      }
    }
  }
  
  // @method String document({String sourceCode[, String name]}) -- Accepts source code and makes docs
  this.document = function(params) {
    if(params.sourceCode === undefined) {
      throw new Error('Thoth.document(): params.sourceCode not defined');
    }
    
    scan(params.sourceCode);
    
    write2('# ' + params.name);
    
    if(nonModule.description) {
      write2(nonModule.description);
    }
    
    var dependencyString = 'Dependencies: ';
    
    if(dependencies.length === 0) {
      dependencyString += 'None';
    } else {
      dependencies.forEach(function(v) {
        dependencyString += ', `' + v.name + '` ' + v.version;
      });
      dependencyString = dependencyString.replace('Dependencies: , ', 'Dependencies: ');
    }
    
    write2(dependencyString);
    
    if(nonModule.example) {
      write2('```\n' + nonModule.example + '\n```');
    }
    
    writeSections(nonModule);
    
    modules.forEach(function(v) {
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
