import React from 'react';
import styled from 'styled-components';
import {
  WrappedAntForm,
  AntInput,
  AntSelect,
  StyledCheckableTag,
} from '../../styled';
import { Icon, Select } from 'antd';
import { causeAreas } from '../../reducers/initialState';

const Option = Select.Option;

export const FirstPart = ({ clickNext, storedData, cancelForm }) => {
  
  return (
    <WrappedAntForm
      layout={'vertical'}
      onSubmit={clickNext}
      handleCancel={cancelForm}
      autofill={storedData}
      buttonText={'Next'}
      cancelButton
      cancelButtonText={'Cancel'}
      noFormLayout
    >
      <AntInput
        name={'Name of Organization'}
        notRequired={'false'}
        placeholder={'Community Helper'}
      />
      <AntInput
        name={'Street Address'}
        notRequired={'false'}
        placeholder={'123 Bruce Willis Dr.'}
      />
      <div className="inline">
        <AntInput
          name={'City'}
          notRequired={'false'}
          placeholder={'Los Angeles'}
        />
        <AntInput
          name={'State'}
          notRequired={'false'}
          placeholder={'California'}
        />
      </div>
      <h4>What type of cause is your organization serving?</h4>
      <AntSelect
        name={'Type of Causes'}
        showArrow
        label={
          <>
            Types of causes <Icon type="question-circle-o" />
          </>
        }
        mode={'multiple'}
        placeholder={'Please select all that apply.'}
        tooltipTitle={'Select all cause areas that your organization helps.'}
      >
        {causeAreas.map(cause => (
          <Option key={cause}>{cause}</Option>
        ))}
      </AntSelect>
      {/* Need to render selected tags here */}
    </WrappedAntForm>
  );
};

export default FirstPart;
