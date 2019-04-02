<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search"></el-button>
      </el-form-item>
    </el-form>
    <hr>
    <br>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row style="min-height:500px;">
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          <a @click="$router.push('./detail/'+scope.$index)">{{ scope.$index + 1}}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="" width="110">
        <template slot-scope="scope">
          <el-button size="mini" @click="centerDialogVisible = true">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column label="Name">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ 'OK' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="mt-20">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
    <el-dialog title="提示" :visible.sync="centerDialogVisible">
      <el-form ref="form" :model="form" label-width="90px" label-position="right">
        <el-form-item label="名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">Create</el-button>
          <el-button @click="centerDialogVisible=false">Cancel</el-button>
        </el-form-item>
      </el-form>
      <!--span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span-->
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      list: null,
      listLoading: true,
      centerDialogVisible: false,
      form: {},
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = [{}, {}];
        this.listLoading = false
      })
    }
  }
}
</script>
