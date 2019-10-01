import React from 'react';
import styled from 'styled-components';
import { WrappedAntForm, AntInput, AntSelect } from '../../styled';
import { Icon, Select } from 'antd';
import { causeAreas } from '../../reducers/initialState';

const Option = Select.Option;

export const FirstPart = ({ clickNext, storedData, cancelForm }) => {
  return (
    <DivForStyling>
      <WrappedAntForm
        layout={'vertical'}
        onSubmit={clickNext}
        handleCancel={cancelForm}
        autofill={storedData}
        submitButton
        submitButtonText={'Next'}
        cancelButton
        cancelButtonText={'Cancel'}
        noFormLayout
      >
        <AntInput
          name={'Name of Organization'}
          placeholder={'Community Helper'}
        />
        <AntInput
          name={'Street Address'}
          placeholder={'123 Bruce Willis Dr.'}
        />
        <div className="inline">
          <AntInput name={'City'} placeholder={'Los Angeles'} />
          <AntInput name={'State'} placeholder={'California'} />
        </div>
        <h4>What type of cause is your organization serving?</h4>
        <div className="ant-select-causes">
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
            tooltipTitle={
              'Select all cause areas that your organization helps.'
            }
          >
            {causeAreas.map(cause => (
              <Option key={cause}>{cause}</Option>
            ))}
          </AntSelect>
        </div>
      </WrappedAntForm>
    </DivForStyling>
  );
};

const DivForStyling = styled.div`
  .inline {
    display: flex;
    justify-content: space-between;

    .ant-row.ant-form-item {
      width: 45%;
    }
  }

  .ant-select-causes {
    .ant-col.ant-form-item-control-wrapper{
        width: 50%;
    }
  }
`;
export default FirstPart;
