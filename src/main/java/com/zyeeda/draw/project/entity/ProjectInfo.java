package com.zyeeda.draw.project.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.zyeeda.cdeio.commons.base.entity.DomainEntity;
import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.organization.entity.Account;

/**
 * 项目信息(抽签界面)
 *
 * $Autuor$
 */
@Entity
@Table(name = "CSG_PROJECT_INFO")
@Scaffold("/draw/project-info")
public class ProjectInfo extends DomainEntity {

    /**
     * 序列化
     */
    private static final long serialVersionUID = -6923532807529113859L;

    /**
     * 项目名称
     */
    private String name;

    /**
     * 所属单位名称
     */
    private String unit;

    /**
     * 所属单位标识
     */
    private String unitMark;

    /**
     * 签号
     */
    private Integer sortitionNum;

    /**
     * 抽签时间
     */
    private Date sortitionTime;

    /**
     * 录入时间
     */
    private Date importTime;

    @Column(name = "F_NAME", length = 300)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

    @Column(name = "F_UNIT", length = 300)
	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

    @Column(name = "F_UNIT_MARK", length = 300)
	public String getUnitMark() {
		return unitMark;
	}

	public void setUnitMark(String unitMark) {
		this.unitMark = unitMark;
	}

    @Column(name = "F_SORTITION_NUM", length = 300)
	public Integer getSortitionNum() {
		return sortitionNum;
	}

	public void setSortitionNum(Integer sortitionNum) {
		this.sortitionNum = sortitionNum;
	}

    @Column(name = "F_SORTITION_TIME")
	public Date getSortitionTime() {
		return sortitionTime;
	}

	public void setSortitionTime(Date sortitionTime) {
		this.sortitionTime = sortitionTime;
	}

    @Column(name = "F_IMPORT_TIME")
	public Date getImportTime() {
		return importTime;
	}

	public void setImportTime(Date importTime) {
		this.importTime = importTime;
	}
}
