import React from 'react';
import {Form, Icon, Tooltip} from 'antd';
import {StyledButton} from '../styled';
import moment from 'moment';
import ProptTypes from 'prop-types';
import styled from 'styled-components';

export class AntForm extends React.Component{
  
  PropTypes = {
    useButton: ProptTypes.bool,
  };
  
  componentDidUpdate(prevProps){
    if (prevProps.autofill !== this.props.autofill){
      for (let key in this.props.autofill){
        const field = this.props.form.getFieldInstance(key);
        if (field){
          if (key === 'startTime' || key === 'endTime'){
            const time = moment(this.props.autofill[ key ], 'HH:MM A');
            this.props.form.setFieldsValue({[ key ]: time});
          }else{
            this.props.form.setFieldsValue({[ key ]: this.props.autofill[ key ]});
          }
        }
        
      }
    }
  }
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err){
        this.props.onSubmit(values);
      }
    });
  };
  
  getCamelCase = name => {
    let camelCase = name.split(' ');
    for (let i = 0; i < camelCase.length; i++){
      camelCase[ i ] = camelCase[ i ].toLowerCase();
      if (i > 0){
        camelCase[ i ] = camelCase[ i ].charAt(0).toUpperCase() +
          camelCase[ i ].slice(1);
      }
    }
    camelCase = camelCase.join('');
    
    return camelCase;
    
  };
  
  getRules = (type, required = true) => {
    const rules = [];
    
    if (type === 'email'){
      rules.push({type: 'email', message: 'Please enter a valid E-mail.'});
    }else if (type === 'url'){
      rules.push({type: 'url', message: 'Please enter a valid url.'});
    }
    
    if (required){
      rules.push({required: true, message: 'This field is required.'});
    }
    
    return rules;
    
  };
  
  getDecorator = (child) => {
    if (child.type && child.type.name){
      const camelCase = this.getCamelCase(child.props.name);
      const required = !child.props.notRequired;
      const rules = this.getRules(child.props.type, required);
      let label = child.props.label ? child.props.label : child.props.name;
      if (child.props.tooltipTitle){
        label = (<Tooltip title={child.props.tooltipTitle}>
              <span>
                {child.props.label ? child.props.label : child.props.name}
              </span>
        </Tooltip>);
      }
      return (<Form.Item label={label}
                         key={camelCase} {...child.props.layout}>
        {this.props.form.getFieldDecorator(camelCase, {rules})(child)}
      </Form.Item>);
    }
    return child;
  };
  
  wrapInDiv = (child, i = 0) => {
    return (<div className={child.props.className}
                 key={`${child.props.className}${i}`}
    >
      {this.renderChildren(child.props.children)}
    </div>);
  };
  
  renderChildren = children => {
    if (!Array.isArray(children)){
      if (children.type === 'div'){
        return this.wrapInDiv(children);
      }
      return this.getDecorator(children);
    }
    return children.map((child, i) => {
      if (child.type === 'div'){
        return this.wrapInDiv(child, i);
      }
      if (Array.isArray(child)){
        return this.renderChildren(child);
      }
      
      return this.getDecorator(child);
    });
  };
  
  render(){
    const formItemLayout = {
      labelCol: {
        xs: {span: 24}, sm: {span: 8},
      }, wrapperCol: {
        xs: {span: 24}, sm: {span: 12},
      },
    };
    
    return (<StyledForm {...formItemLayout} onSubmit={this.handleSubmit}
                        hideRequiredMark
                        layout={this.props.layout ? this.props.layout :
                          'horizontal'}>
      {this.renderChildren(this.props.children)}
      {this.props.useButton &&
      (<StyledButton onClick={this.handleSubmit} type={'submit'}>
        Submit
      </StyledButton>)}
    </StyledForm>);
  }
}

const StyledForm = styled(Form)`
label {
  align-text: left;
}
`;

export const WrappedAntForm = Form.create({name: 'register'})(AntForm);
