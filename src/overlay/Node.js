export class Node 
{
    constructor(type) 
    {
        if (typeof type === 'string') 
        {
            this.m_DOMElement = document.createElement(type);
        }
        else 
        {
            this.m_DOMElement = type;
        }

        this.m_ClassName;
        this.m_NodeId;
        this.m_ChildNodes = [];
    }

    SetClassName = function(className) 
    {
        this.m_ClassName = className;
    }

    SetParent = function(parent) 
    {
        if (parent) 
        {
            parent.appendChild(this.m_DOMElement);
        }
        else 
        {
            this.Remove();
        }
    }

    Remove = function() 
    {
        this.m_DOMElement.remove();
    }

    AppendNode = function(node) 
    {
        this.m_ChildNodes.push(node);
        node.SetParent(this);
    }

    RemoveNode = function(node) 
    {
        this.m_ChildNodes.splice(this.m_ChildNodes.indexOf(node), 1);
        node.SetParent();
    }
}

export class RootNode extends Node 
{
    constructor() 
    {
        let rootDiv = document.getElementById('canvas-overlay');
        super(rootDiv);
    }
}