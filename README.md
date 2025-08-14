# NetSuite AI Connector - Custom MCP Tool

A powerful NetSuite integration tool that enables AI-powered interactions with NetSuite data through custom Model Context Protocol (MCP) tools. This project provides a boilerplate for creating custom tools that can query, manipulate, and interact with NetSuite data programmatically.

## 🚀 Features

- **Custom MCP Tools**: Create specialized tools for NetSuite data operations
- **SuiteScript Integration**: Leverage NetSuite's SuiteScript capabilities
- **AI-Powered Interactions**: Enable AI assistants to work with NetSuite data
- **Flexible Architecture**: Modular design for easy customization and extension
- **SuiteCloud SDF Support**: Full compatibility with NetSuite's SuiteCloud Development Framework

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### 1. Node.js and npm
- **Node.js**: Version 16.x or higher
- **npm**: Version 8.x or higher

### 2. SuiteCloud CLI
Install the SuiteCloud CLI globally:
```bash
npm install -g @oracle/suitecloud-cli
```

### 3. NetSuite Account
- A NetSuite account with administrator privileges
- Access to SuiteCloud Development Framework (SDF)
- Proper authentication credentials

### 4. Development Environment
- Git for version control
- A code editor (VS Code recommended)
- Terminal/Command Prompt access

## 🛠️ Installation & Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/abdul-mangrio/ns-mcp-custom-tool.git
cd ns-mcp-custom-tool
```

### Step 2: Initialize SuiteCloud Project
```bash
suitecloud project:create --projectname custom-mcp-tools
```

### Step 3: Configure Authentication
1. Log in to your NetSuite account
2. Navigate to Setup > Integration > Manage Integrations
3. Create a new integration record
4. Note down the Consumer Key and Consumer Secret

### Step 4: Set Up Project Configuration
Update the `suitecloud.config.js` file with your NetSuite credentials:
```javascript
module.exports = {
    defaultProjectFolder: "src",
    deployables: {
        objects: "./src/Objects",
        suitescripts: "./src/FileCabinet/SuiteScripts",
        templates: "./src/Templates"
    },
    paths: {
        src: "./src",
        fileCabinet: "./src/FileCabinet",
        objects: "./src/Objects"
    }
};
```

### Step 5: Install Dependencies
```bash
npm install
```

## 📁 Project Structure

```
custom-mcp-tools/
├── src/
│   ├── FileCabinet/
│   │   └── SuiteScripts/
│   │       └── customtool/
│   │           ├── scriptfile.js          # Main SuiteScript file
│   │           └── scriptfile_schema.json # Schema definition
│   ├── Objects/
│   │   └── customtool_test1.xml          # Custom object definition
│   ├── Templates/
│   │   ├── E-mail Templates/
│   │   └── Marketing Templates/
│   ├── manifest.xml                      # Project manifest
│   └── deploy.xml                        # Deployment configuration
├── suitecloud.config.js                  # SuiteCloud configuration
├── .gitignore                           # Git ignore rules
└── README.md                            # This file
```

## 🔧 Configuration

### SuiteCloud Configuration
The `suitecloud.config.js` file contains the main configuration for your SuiteCloud project:

- **defaultProjectFolder**: Specifies the source directory
- **deployables**: Defines deployable components
- **paths**: Maps project directories

### Custom Tool Configuration
Each custom tool is defined in the `src/FileCabinet/SuiteScripts/customtool/` directory:

- **scriptfile.js**: Contains the main SuiteScript logic
- **scriptfile_schema.json**: Defines the tool's schema and parameters

## 🚀 Usage

### Deploying to NetSuite
```bash
# Deploy the entire project
suitecloud project:deploy

# Deploy specific components
suitecloud project:deploy --objects
suitecloud project:deploy --suitescripts
```

### Testing Custom Tools
1. Deploy your custom tools to NetSuite
2. Navigate to Customization > Scripting > Scripts
3. Find your deployed script and test it
4. Use the NetSuite debugger for troubleshooting

### Creating New Custom Tools
1. Create a new directory in `src/FileCabinet/SuiteScripts/`
2. Add your SuiteScript file (e.g., `mytool.js`)
3. Create a corresponding schema file (e.g., `mytool_schema.json`)
4. Update the manifest.xml to include your new tool
5. Deploy to NetSuite

## 📝 Example Custom Tool

Here's an example of a simple custom tool that retrieves customer data:

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/search'], function(search) {
    
    function afterSubmit(context) {
        // Your custom tool logic here
        var customerSearch = search.create({
            type: search.Type.CUSTOMER,
            filters: [
                ['type', 'is', 'CUST']
            ],
            columns: [
                'entityid',
                'companyname',
                'email'
            ]
        });
        
        // Process search results
        customerSearch.run().each(function(result) {
            // Handle each customer record
            return true;
        });
    }
    
    return {
        afterSubmit: afterSubmit
    };
});
```

## 🔍 Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Verify your NetSuite credentials
   - Check integration record permissions
   - Ensure proper role assignments

2. **Deployment Failures**
   - Check SuiteCloud CLI version
   - Verify project structure
   - Review error logs in NetSuite

3. **Script Execution Errors**
   - Use NetSuite's debugger
   - Check script logs
   - Verify API version compatibility

### Debugging Tips

- Use `suitecloud project:validate` to check for issues
- Enable NetSuite's script debugger
- Check execution logs in NetSuite
- Use console.log() for debugging (view in NetSuite logs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in this repository
- Check NetSuite's official documentation
- Review SuiteCloud CLI documentation
- Contact the development team

## 🔗 Useful Links

- [NetSuite Developer Documentation](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/)
- [SuiteCloud CLI Documentation](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_159266158199.html)
- [SuiteScript API Reference](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_159266158199.html)
- [Model Context Protocol (MCP) Documentation](https://modelcontextprotocol.io/)

---

**Note**: This project is designed as a boilerplate for creating custom NetSuite AI connector tools. Customize the code according to your specific requirements and NetSuite environment configuration.
